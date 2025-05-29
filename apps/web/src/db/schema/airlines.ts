import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const airlines = sqliteTable("airlines", {
  id: integer().primaryKey({ autoIncrement: true }),
  airlineCode: text().notNull(),
  telephony: text().notNull(),
});
