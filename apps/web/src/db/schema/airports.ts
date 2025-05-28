import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const airports = sqliteTable("airports", {
  airportCode: text().primaryKey(),
  name: text().notNull(),
});
