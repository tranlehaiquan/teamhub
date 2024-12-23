import { Injectable } from '@nestjs/common';
import { CreateAuthInput, UserSignIn } from './dto/create-auth.input';
import { DrizzleService, dbSchema } from '@workspace/drizzle-module';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly JWTService: JwtService,
  ) {}

  async register(createAuthInput: CreateAuthInput) {
    const hashedPassword = await hash(createAuthInput.password);
    const results = await this.drizzle.drizzleClient
      .insert(dbSchema.users)
      .values({
        name: createAuthInput.name,
        email: createAuthInput.email,
        password: hashedPassword,
      })
      .returning();

    return {
      ...results[0],
    };
  }

  async login(userSignIn: UserSignIn) {
    const email = userSignIn.email;

    const users = await this.drizzle.drizzleClient
      .select()
      .from(dbSchema.users)
      .where(eq(dbSchema.users.email, email));
    const user = users[0];

    if (!user) {
      throw new Error('User not found');
    }
    const password = user.password;

    const isCorrectPWD = await verify(password, userSignIn.password);

    if (!isCorrectPWD) {
      throw new Error('Invalid password');
    }

    // Generate JWT
    return {
      ...user,
    };
  }

  async getCurrentUser() {
    return 'current user';
  }
}
