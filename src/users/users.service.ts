import { Injectable, Inject } from '@nestjs/common';
import postgres from 'postgres';
import { DATABASE_CONNECTION } from '../database/database.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION) private sql: postgres.Sql,
  ) {}

  async findAllUsers(): Promise<any[]> {
    // Example: Fetch all users from the "USERS" table
    const users = await this.sql`select * from "users"`;
    return users;
  }
}
