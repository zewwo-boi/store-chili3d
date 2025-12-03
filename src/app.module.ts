import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DataModule } from './data/data.module';
import { DataController } from "./data/data.controller";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, DataModule],
  controllers: [AppController, DataController],
  providers: [AppService],
})
export class AppModule {}
