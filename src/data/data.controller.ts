import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SaveTimeRecordRequest, TimeRecord } from './interfaces/main';
import { DataService } from './data.service';
import { Commits } from './interfaces/diff';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('/')
  async createRecord(@Body() data: SaveTimeRecordRequest) {
    return this.dataService.createData(data);
  }

  // TODO: Offload to in-memory database
  @Patch('/')
  async updateOneRecord(
    @Body()
    data: Commits,
  ) {
    return this.dataService.updateDataFromCommits(data);
  }

  @Get('/:id')
  async getOneRecord(@Param() params: { id: string }) {
    return this.dataService.findOneData(params.id);
  }
}
