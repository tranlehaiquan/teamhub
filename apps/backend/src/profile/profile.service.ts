import { Injectable } from '@nestjs/common';
import { dbSchema, DrizzleService } from '@workspace/drizzle-module';
import { eq } from 'drizzle-orm';
import { first } from 'lodash';

@Injectable()
export class ProfileService {
  constructor(private readonly drizzle: DrizzleService) {}

  async createProfile(input: any) {
    return this.drizzle.drizzleClient
      .insert(dbSchema.profileInfoTable)
      .values(input)
      .returning();
  }

  async findProfileById(id: string) {
    const data = await this.drizzle.drizzleClient
      .select()
      .from(dbSchema.profileInfoTable)
      .where(eq(dbSchema.profileInfoTable.id, id));

    return first(data);
  }

  async findProfileByUserId(userId: string) {
    const data = await this.drizzle.drizzleClient
      .select()
      .from(dbSchema.profileInfoTable)
      .where(eq(dbSchema.profileInfoTable.userId, userId));

    return first(data);
  }
}
