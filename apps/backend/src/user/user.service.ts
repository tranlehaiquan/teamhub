import { Injectable } from '@nestjs/common';
import { DrizzleService, dbSchema } from '@workspace/drizzle-module';
import { CreateUserInput } from './dto/create-user';
import { eq } from 'drizzle-orm';
import { UpdateUserInput } from './dto/update-user';
import { first, omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  createUser(input: CreateUserInput) {
    return this.drizzle.drizzleClient
      .insert(dbSchema.usersTable)
      .values(input)
      .returning();
  }

  createUserWithProfile(input: CreateUserInput) {
    return this.drizzle.drizzleClient.transaction(async (trx) => {
      const user = await trx
        .insert(dbSchema.usersTable)
        .values(input)
        .returning();

      const profile = await trx
        .insert(dbSchema.profileInfoTable)
        .values({
          userId: user[0].id,
          metadata: {},
        })
        .returning();

      return {
        user: omit(first(user), ['password']),
        profile: first(profile),
      };
    });
  }

  async findUserByEmail(email: string) {
    return await this.drizzle.drizzleClient
      .select()
      .from(dbSchema.usersTable)
      .where(eq(dbSchema.usersTable.email, email));
  }

  // get user by id
  async getUserById(id: string) {
    return await this.drizzle.drizzleClient
      .select()
      .from(dbSchema.usersTable)
      .where(eq(dbSchema.usersTable.id, id));
  }

  async updateUserById(id: string, input: UpdateUserInput) {
    const data = await this.drizzle.drizzleClient
      .update(dbSchema.usersTable)
      .set(input)
      .where(eq(dbSchema.usersTable.id, id))
      .returning();

    return omit(first(data), ['password']);
  }

  async findAll(offset = 1, limit = 10) {
    return await this.drizzle.drizzleClient
      .select()
      .from(dbSchema.usersTable)
      .limit(limit)
      .offset(offset * limit);
  }
}
