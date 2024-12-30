import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  varchar,
  uuid,
  jsonb,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const rolesEnum = pgEnum("roles", ["user", "admin"]);
export type UsersRole = (typeof rolesEnum.enumValues)[number];

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: rolesEnum().default("user"),
  ...timestamps,
});

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  profileInfo: one(profileInfoTable),
  usersToTeams: many(usersToTeamsTable),
}));

export const profileInfoTable = pgTable("user_profiles", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id").references(() => usersTable.id),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const profileInfoRelations = relations(profileInfoTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profileInfoTable.userId],
    references: [usersTable.id],
  }),
}));

// teams table
export const teamsTable = pgTable("teams", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export const teamsRelations = relations(teamsTable, ({ many }) => ({
  usersToTeams: many(usersToTeamsTable),
}));

export const usersToTeamsTable = pgTable(
  "users_to_teams",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
    teamId: uuid("team_id")
      .notNull()
      .references(() => teamsTable.id),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.teamId] })]
);

// skills table
export const skillsTable = pgTable("skills", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

// users have many skills, skills belong to many users
export const usersToSkillsTable = pgTable(
  "users_to_skills",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => skillsTable.id),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.skillId] })]
);