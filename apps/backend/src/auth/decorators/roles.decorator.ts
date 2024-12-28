import { SetMetadata } from '@nestjs/common';
import { dbSchema } from '@workspace/drizzle-module';
import { ROLES_KEY } from '../constants';

export const Roles = (...roles: [dbSchema.UsersRole | dbSchema.UsersRole[]]) =>
  SetMetadata(ROLES_KEY, roles);
