import { DynamicModule, Module } from "@nestjs/common";
import { DrizzleService } from "./drizzle-db.service";
import { DRIZZLE_DB_OPTIONS, DrizzleDbOptions } from "./drizzle-db.constants";

@Module({
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule {
  static register(options: DrizzleDbOptions): DynamicModule {
    return {
      module: DrizzleModule,
      providers: [
        {
          provide: DRIZZLE_DB_OPTIONS,
          useValue: options,
        },
        DrizzleService,
      ],
      exports: [DrizzleService],
    };
  }
}
