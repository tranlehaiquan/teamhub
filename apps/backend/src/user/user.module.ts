import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from '@workspace/drizzle-module';
import { UserResolver } from './user.resolver';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DrizzleModule.register({
      databaseURL: process.env.DATABASE_URL,
    }),
    ProfileModule,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
