import { relations } from "drizzle-orm";
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { airports } from "./airports";
import { scenarios } from "./scenarios";

export const plans = sqliteTable(
  "plans",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    scenarioId: integer().notNull(),
    aid: text().notNull(),
    alt: real(),
    bcn: real(),
    cid: integer(),
    dep: text(),
    dest: text(),
    eq: text(),
    pilotName: text(),
    homeAirport: text(),
    raw: text(),
    rmk: text(),
    rte: text(),
    spd: real(),
    typ: text(),
    vatsimId: integer().notNull(),
  },
  (table) => [
    index("plansScenarioId_idx").on(table.scenarioId),
  ],
);

export const planRelations = relations(plans, ({ one }) => ({
  scenario: one(scenarios, {
    fields: [plans.scenarioId],
    references: [scenarios.id],
    relationName: "scenario",
  }),
  depAirportInfo: one(airports, {
    fields: [plans.dep],
    references: [airports.airportCode],
    relationName: "depAirportInfo",
  }),
  destAirportInfo: one(airports, {
    fields: [plans.dest],
    references: [airports.airportCode],
    relationName: "destAirportInfo",
  }),
}));
