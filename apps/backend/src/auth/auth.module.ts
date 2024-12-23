import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { DrizzleModule } from '@workspace/drizzle-module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    DrizzleModule.register({
      databaseURL: process.env.DATABASE_URL,
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
