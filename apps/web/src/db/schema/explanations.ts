import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { scenarios } from "./scenarios";

import { z } from "zod";

export const explanationSchema = z.object({
  id: z.number().optional(), // Primary key, optional for inserts
  scenarioId: z.number().nonnegative(),
  headline: z.string().min(1), // Required, must have at least 1 character
  level: z.enum(["error", "info", "tip", "warning"]),
  description: z.string().min(1), // Required, must have at least 1 character
  order: z.number(),
});

export const explanationsArraySchema = z.array(explanationSchema); // Schema for an array of explanations

export const explanations = sqliteTable(
  "explanations",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    scenarioId: integer().notNull(),
    headline: text().notNull(),
    level: text({ enum: ["error", "info", "tip", "warning"] }).notNull(),
    description: text().notNull(),
    order: integer().notNull().default(0),
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
