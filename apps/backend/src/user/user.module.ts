import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from '@workspace/drizzle-module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DrizzleModule.register({
      databaseURL: process.env.DATABASE_URL,
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
