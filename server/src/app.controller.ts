import { Get, Controller, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get("/ping") 
  @HttpCode(200)
  ping() {
    return 200
  }
}
