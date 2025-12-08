import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import postgres from 'postgres';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { SaveTimeRecordRequest, TimeRecord } from './interfaces/main';
import { Commits, Diff } from './interfaces/diff';
import { DataTable } from './interfaces/database';

@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);

  constructor(@Inject(DATABASE_CONNECTION) private sql: postgres.Sql) {}

  async findAllData(limit = 100, offset = 0): Promise<DataTable[]> {
    const data = await this.sql<
      DataTable[]
    >`select * from data limit ${limit} offset ${offset};`;
    return data;
  }

  async findOneData(id: string): Promise<DataTable> {
    const data = await this.sql<
      DataTable[]
    >`select * from data where id=${id} limit 1;`;

    if (data.length === 0) {
      throw new NotFoundException(`Data with ID "${id}" not found.`);
    }

    return data[0];
  }

  async createData(data: SaveTimeRecordRequest): Promise<any[]> {
    try {
      const res = await this.sql`
      insert into data
      (id, time_record)
      values (${data.id}, ${this.sql.json(data.payload as any)});`;
      return res;
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique_violation error code
        throw new HttpException(
          `Data with ID "${data.id}" already exists.`,
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  async updateRecord(id: string, data: TimeRecord[]): Promise<any[]> {
    try {
      const res = await this.sql`
        update data
        set time_record = ${this.sql.json(data as any)}
        where id = ${id};
      `;
      return res;
    } catch (err) {
      this.logger.error(`Failed to update record ${id}`, err);
      throw err;
    }
  }

  async updateDataFromCommits(data: Commits) {
    return this.sql.begin(async (sql) => {
      const rows = await sql<
        DataTable[]
      >`select * from data where id=${data.rootId} for update;`;

      if (rows.length === 0) {
        throw new NotFoundException(`Data with ID "${data.rootId}" not found.`);
      }

      const storedData = rows[0].time_record as unknown as TimeRecord[];
      const updatedData = this.applyCommits(storedData, data.commits);

      return sql`
        update data
        set time_record = ${sql.json(updatedData as any)}
        where id = ${data.rootId};
      `;
    });
  }

  applyCommits(storedData: TimeRecord[], commits: Diff[]): TimeRecord[] {
    const tree = new Map(storedData.map((v) => [v.id as string, v]));
    commits.forEach((commit) => {
      commit.change.parentId = commit.parentId;

      const parent = tree.get(commit.parentId);
      if (parent && !parent.children.includes(commit.change.id)) {
        parent.children.push(commit.change.id);
      }
      tree.set(commit.change.id, commit.change);
    });

    return this.mapToArray(tree);
  }

  mapToArray<K, V>(map: Map<K, V>) {
    const nodes: V[] = [];
    map.forEach((v) => {
      nodes.push(v);
    });
    return nodes;
  }
}
