import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import postgres, { SerializableParameter } from 'postgres';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { SaveTimeRecordRequest, TimeRecord } from './interfaces/main';
import { Commits } from './interfaces/diff';
import { DataTable } from './interfaces/database';

@Injectable()
export class DataService {
  constructor(@Inject(DATABASE_CONNECTION) private sql: postgres.Sql) {}

  async findAllData(): Promise<any[]> {
    // Example: Fetch all users from the "USERS" table
    const data = await this.sql`select * from data;`;
    return data;
  }

  async findOneData(id: string): Promise<DataTable> {
    const data = await this.sql<
      DataTable[]
    >`select * from data where id=${id} limit 1;`;

    data[0].time_record = this.fromJsonb(data[0].time_record);
    return data[0];
  }

  async createData(data: SaveTimeRecordRequest): Promise<any[]> {
    let string_data: string = this.toJsonb(data.payload);

    try {
      const res = await this.sql`
      insert into data
      (id, time_record)
      values (${data.id}, ${string_data});`;
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
    let string_data: string = this.toJsonb(data);

    try {
      const res = await this.sql`
        update data
        set time_record = ${string_data}
        where id = ${id};
      `;
      return res;
    } catch (err) {
      // TODO: Handle error
      throw err;
    }
  }

  async updateDataFromCommits(data: Commits) {
    const commits = data.commits;
    const storedData = (await this.findOneData(data.rootId)).time_record;

    let tree = new Map(storedData.map((v, i) => [v.id as string, v]));
    commits.forEach((commit, i) => {
      commit.change.parentId = commit.parentId;

      const parent = tree.get(commit.parentId);
      // Prevent duplicates
      if (parent && !parent.children.includes(commit.change.id)) {
        parent.children.push(commit.change.id);
      }
      tree.set(commit.change.id, commit.change);
    });

    return this.updateRecord(data.rootId, this.mapToArray(tree));
  }

  /**
   * Convert jsonb into a regular object.
   *
   * @remarks
   * This is designed to convert a json string returned by postgres.js that is falsely identifying as a native object.
   */
  fromJsonb<T>(from: T): T {
    const data = from as unknown as string;

    return JSON.parse(data) as T;
  }

  /**
   * Converts object into json string representation
   */
  toJsonb<T>(from: T): string {
    try {
      return JSON.stringify(from);
    } catch (err) {
      throw new HttpException('Cyclic Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  mapToArray<K, V>(map: Map<K, V>) {
    const nodes: V[] = [];
    map.forEach((v, i) => {
      nodes.push(v);
    });
    return nodes;
  }
}
