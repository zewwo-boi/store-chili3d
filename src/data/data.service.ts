import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import postgres from 'postgres';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { SaveTimeRecordRequest, TimeRecord } from './interfaces/main';

@Injectable()
export class DataService {
  constructor(@Inject(DATABASE_CONNECTION) private sql: postgres.Sql) {}

  async findAllData(): Promise<any[]> {
    // Example: Fetch all users from the "USERS" table
    const data = await this.sql`select * from data;`;
    return data;
  }

  async createData(data: SaveTimeRecordRequest): Promise<any[]> {
    let string_data: string;
    try {
      string_data = JSON.stringify(data.payload);
    } catch (err) {
      throw new HttpException('Cyclic Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const res = await this.sql`
    insert into data
    (id, time_record)
    values (${data.id}, ${string_data});`;
    return res;
  }
}
