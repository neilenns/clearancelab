import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { plans } from "./plans";

export const airports = sqliteTable("airports", {
  airportCode: text().primaryKey(),
  name: text().notNull(),
});

export const airportsRelations = relations(airports, ({ one }) => ({
  depAirportInfo: one(plans, {
    fields: [airports.airportCode],
    references: [plans.dep],
    relationName: "depAirportInfo",
  }),
  destAirportInfo: one(plans, {
    fields: [airports.airportCode],
    references: [plans.dest],
    relationName: "destAirportInfo",
  }),
}));
