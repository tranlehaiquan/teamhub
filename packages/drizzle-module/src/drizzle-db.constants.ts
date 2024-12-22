export const DRIZZLE_DB_OPTIONS = Symbol.for('DRIZZLE_DB_OPTIONS');

export type DrizzleDbOptions = {
  databaseURL: string;
}