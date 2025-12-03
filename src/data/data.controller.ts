import { Body, Controller, Get, Post } from '@nestjs/common';
import { SaveTimeRecordRequest, TimeRecord } from './interfaces/main';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('/')
  async createRecord(@Body() data: SaveTimeRecordRequest) {
    return this.dataService.createData(data);
  }

  // ! Do not expose.
  @Get('/')
  async getRecord() {
    return this.dataService.findAllData()
  }
}
