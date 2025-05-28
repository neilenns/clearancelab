import { relations } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { craft } from "./craft";
import { explanations } from "./explanations";
import { plans } from "./plans";

export const scenarios = sqliteTable("scenarios", {
  id: integer().primaryKey({ autoIncrement: true }),
  canClear: integer({ mode: "boolean" }).notNull(),
  isValid: integer({ mode: "boolean" }).notNull(),
  views: integer().notNull().default(0),
});

export const scenariosRelations = relations(scenarios, ({ one, many }) => ({
  plan: one(plans),
  explanations: many(explanations),
  craft: one(craft),
}));
