import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DrizzleService, dbSchema } from '@workspace/drizzle-module';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private drizzle: DrizzleService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async testDrizzle(): Promise<any> {
    return this.drizzle.drizzleClient.select().from(dbSchema.users).execute();
  }
}
