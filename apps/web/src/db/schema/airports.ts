import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { scenarios } from "./scenarios";

export const airports = sqliteTable("airports", {
  airportCode: text().primaryKey(),
  name: text().notNull(),
});

export const airportsRelations = relations(airports, ({ one }) => ({
  depAirportInfo: one(scenarios, {
    fields: [airports.airportCode],
    references: [scenarios.plan_dep],
    relationName: "depAirportInfo",
  }),
  destAirportInfo: one(scenarios, {
    fields: [airports.airportCode],
    references: [scenarios.plan_dest],
    relationName: "destAirportInfo",
  }),
}));
