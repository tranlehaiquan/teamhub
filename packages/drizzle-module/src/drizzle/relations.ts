import { relations } from "drizzle-orm/relations";
import { users, userProfiles } from "./schema";

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  userProfiles: many(userProfiles),
}));
