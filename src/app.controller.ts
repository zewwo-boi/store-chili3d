import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataService } from './data/data.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/data')
  // async getAllData(): Promise<any[]> {
  //   return this.dataService.findAllData();
  // }
}
