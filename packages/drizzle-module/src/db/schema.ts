import { integer, pgTable, timestamp, varchar, uuid } from 'drizzle-orm/pg-core';

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
}

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

