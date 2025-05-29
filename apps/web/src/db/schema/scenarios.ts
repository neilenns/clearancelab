import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { airports } from "./airports";
import { explanations } from "./explanations";

export enum FlowDirection {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

export const scenarios = sqliteTable("scenarios", {
  id: integer().primaryKey({ autoIncrement: true }),
  canClear: integer({ mode: "boolean" }).notNull(),
  isValid: integer({ mode: "boolean" }).notNull(),
  views: integer().notNull().default(0),
  plan_aid: text().notNull(),
  plan_alt: real(),
  plan_bcn: real(),
  plan_cid: integer(),
  plan_dep: text().references(() => airports.airportCode),
  plan_dest: text().references(() => airports.airportCode),
  plan_eq: text(),
  plan_pilotName: text(),
  plan_homeAirport: text(),
  plan_rmk: text(),
  plan_rte: text(),
  plan_spd: real(),
  plan_typ: text(),
  plan_vatsimId: integer().notNull(),
  craft_altitude: text(),
  craft_clearanceLimit: text(),
  craft_controllerName: text(),
  craft_frequency: real(),
  craft_route: text(),
  craft_telephony: text(),
  airportConditions_flow: text({ enum: ["NORTH", "SOUTH", "EAST", "WEST"] }),
  airportConditions_altimeter: real(),
  airportConditions_departureOnline: integer({ mode: "boolean" })
    .notNull()
    .default(false),
});

export const scenariosRelations = relations(scenarios, ({ one, many }) => ({
  depAirportInfo: one(airports, {
    fields: [scenarios.plan_dep],
    references: [airports.airportCode],
    relationName: "depAirportInfo",
  }),
  destAirportInfo: one(airports, {
    fields: [scenarios.plan_dest],
    references: [airports.airportCode],
    relationName: "destAirportInfo",
  }),
  explanations: many(explanations),
}));
