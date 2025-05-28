import { relations } from "drizzle-orm";
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { scenarios } from "./scenarios";

export const craft = sqliteTable(
  "craft",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    scenarioId: integer().notNull(),
    altitude: text(),
    clearanceLimit: text(),
    controllerName: text(),
    frequency: real(),
    route: text(),
    telephony: text(),
  },
  (table) => [
    index("craftScenarioId_idx").on(table.scenarioId),
  ],
);

export const craftRelations = relations(craft, ({ one }) => ({
  craft: one(scenarios, {
    fields: [craft.scenarioId],
    references: [scenarios.id],
    relationName: "craftInfo",
  }),
}));
