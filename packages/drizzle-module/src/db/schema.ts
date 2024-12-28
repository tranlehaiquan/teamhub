import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  varchar,
  uuid,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const rolesEnum = pgEnum("roles", ["user", "admin"]);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: rolesEnum().default("user"),
  ...timestamps,
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  profileInfo: one(profileInfo),
}));

export const profileInfo = pgTable("user_profiles", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id").references(() => usersTable.id),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
  user: one(usersTable, {
    fields: [profileInfo.userId],
    references: [usersTable.id],
  }),
}));
