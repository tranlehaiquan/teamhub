import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from '@workspace/drizzle-module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DrizzleModule.register({
      databaseURL: process.env.DATABASE_URL,
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
