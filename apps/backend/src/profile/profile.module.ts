import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { DrizzleModule } from '@workspace/drizzle-module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DrizzleModule.register({
      databaseURL: process.env.DATABASE_URL,
    }),
  ],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
