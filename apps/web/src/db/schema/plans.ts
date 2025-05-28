import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { airports } from "./airports";

export const plans = sqliteTable("plans", {
  id: integer().primaryKey({ autoIncrement: true }),
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
});

export const planRelations = relations(plans, ({ one }) => ({
  depAirportInfo: one(airports, {
    relationName: "depAirportInfo",
    fields: [plans.dep],
    references: [airports.airportCode],
  }),
  destAirportInfo: one(airports, {
    relationName: "destAirportInfo",
    fields: [plans.dest],
    references: [airports.airportCode],
  }),
}));
