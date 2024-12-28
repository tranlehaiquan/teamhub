import { Injectable } from '@nestjs/common';
import { DrizzleService, dbSchema } from '@workspace/drizzle-module';
import { CreateUserInput } from './dto/create-user';
import { eq } from 'drizzle-orm';
import { UpdateUserInput } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  createUser(input: CreateUserInput) {
    return this.drizzle.drizzleClient
      .insert(dbSchema.users)
      .values(input)
      .returning();
  }

  async findUserByEmail(email: string) {
    return await this.drizzle.drizzleClient
      .select()
      .from(dbSchema.users)
      .where(eq(dbSchema.users.email, email));
  }

  // get user by id
  async getUserById(id: string) {
    return await this.drizzle.drizzleClient
      .select()
      .from(dbSchema.users)
      .where(eq(dbSchema.users.id, id));
  }

  async updateUserById(id: string, input: UpdateUserInput) {
    return await this.drizzle.drizzleClient
      .update(dbSchema.users)
      .set(input)
      .where(eq(dbSchema.users.id, id))
      .returning();
  }
}
