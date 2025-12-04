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
    return data[0];
  }

  async createData(data: SaveTimeRecordRequest): Promise<any[]> {
    let string_data: string;
    try {
      string_data = JSON.stringify(data.payload);
    } catch (err) {
      throw new HttpException('Cyclic Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }

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
    let string_data: string;
    try {
      string_data = JSON.stringify(data);
    } catch (err) {
      throw new HttpException('Cyclic Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }

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

    console.log(JSON.stringify(storedData));
    console.log(storedData);
    console.log('\n');

    let tree = new Map(
      Object.values(storedData).map((v, i) => [v.id as string, v]),
    );
    commits.forEach((commit, i) => {
      commit.change.parentId = commit.parentId;

      tree.get(commit.parentId)?.children.push(commit.change.id);
      tree.set(commit.change.id, commit.change);
    });

    return this.updateRecord(data.rootId, this.mapToArray(tree));
  }

  mapToArray<K, V>(map: Map<K, V>) {
    const nodes: V[] = [];
    map.forEach((v, i) => {
      nodes.push(v);
    });
    return nodes;
  }
}
