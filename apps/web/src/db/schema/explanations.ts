import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { scenarios } from "./scenarios";

// Define the level type
export enum Level {
  ERROR = "error",
  INFO = "info",
  TIP = "tip",
  WARNING = "warning",
}

export const explanations = sqliteTable(
  "explanations",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    scenarioId: integer().notNull(),
    headline: text().notNull(),
    level: text().notNull(),
    description: text().notNull(),
  },
  (table) => [
    index("scenarioId_idx").on(table.scenarioId),
  ],
);

export const explanationRelations = relations(explanations, ({ one }) => ({
  scenario: one(scenarios, {
    fields: [explanations.scenarioId],
    references: [scenarios.id],
  }),
}));
