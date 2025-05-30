import { count, eq, InferInsertModel, sql } from "drizzle-orm";
import { z } from "zod";
import {
  getDatabaseAsync,
  nullsToUndefined,
  ReplaceNullWithUndefined,
} from ".";
import { Explanation } from "./explanations";
import { FlowDirection, scenarios } from "./schema";

export const getScenarioStatistics = async () => {
  try {
    const database = await getDatabaseAsync();

    const canClear = await database
      .select({ name: scenarios.canClear, count: count(scenarios.id) })
      .from(scenarios)
      .groupBy(scenarios.canClear);

    const isValid = await database
      .select({ name: scenarios.isValid, count: count(scenarios.id) })
      .from(scenarios)
      .groupBy(scenarios.isValid);

    const departures = await database
      .select({ name: scenarios.plan_dep, count: count(scenarios.id) })
      .from(scenarios)
      .groupBy(scenarios.plan_dep);

    const destinations = await database
      .select({ name: scenarios.plan_dest, count: count(scenarios.id) })
      .from(scenarios)
      .groupBy(scenarios.plan_dest);

    // There is probably a way to do these type conversions in drizzle directly but I can't figure it out,
    // so doing it this way.
    return {
      canClear: canClear.map((element) => {
        return { item: element.name.toString(), count: element.count };
      }),
      isValid: isValid.map((element) => {
        return { item: element.name.toString(), count: element.count };
      }),
      departures: departures.map((element) => {
        return { item: element.name ?? "None", count: element.count };
      }),
      destinations: destinations.map((element) => {
        return { item: element.name ?? "None", count: element.count };
      }),
    };
  } catch (error) {
    console.error("Error calculating scenario statistics:", error);
    throw new Error("Failed calculating scenario statistics");
  }
};

export const getScenario = async (id: number) => {
  try {
    if (typeof id !== "number" || Number.isNaN(id)) {
      throw new TypeError("Invalid scenario ID");
    }
    const database = await getDatabaseAsync();

    const result = await database.query.scenarios.findFirst({
      where: (scenarios, { eq }) => eq(scenarios.id, id),
      with: {
        explanations: {
          orderBy: (explanations, { asc }) => [asc(explanations.order)],
        },
        destAirportInfo: true,
        depAirportInfo: true,
      },
    });

    return result
      ? (nullsToUndefined(result) as ReplaceNullWithUndefined<typeof result>)
      : undefined;
  } catch (error) {
    console.error("Error fetching scenario:", error);
    throw new Error("Failed to fetch scenario");
  }
};

export const getSummaryScenarios = async () => {
  try {
    const database = await getDatabaseAsync();

    const results = await database.query.scenarios.findMany({
      columns: {
        id: true,
        isValid: true,
        canClear: true,
        plan_dep: true,
        plan_dest: true,
        plan_aid: true,
        plan_rte: true,
      },
    });

    return results.map((element) => nullsToUndefined(element));
  } catch (error) {
    console.error("Error fetching scenarios summary:", error);
    throw new Error("Failed to fetch scenarios summary");
  }
};

export const incrementViews = async (id: number) => {
  try {
    const database = await getDatabaseAsync();

    // Update the database with the new value
    return await database
      .update(scenarios)
      .set({
        views: sql`${scenarios.views} + 1`,
      })
      .where(eq(scenarios.id, id));
  } catch (error) {
    console.error("Error incrementing views for scenario:", error);
    throw error;
  }
};

export const insertScenario = async (scenario: Scenario) => {
  try {
    const database = await getDatabaseAsync();

    return await database
      .insert(scenarios)
      .values(scenario)
      .returning({ insertedId: scenarios.id });
  } catch (error) {
    console.error("Error inserting scenario:", error);
    throw error;
  }
};

export const updateScenario = async (scenario: Scenario) => {
  if (scenario.id === undefined || scenario.id === null) {
    console.error("Scenario ID must be specified to update a scenario.");
    throw new Error("Scenario ID must be specified to update a scenario.");
  }

  try {
    const database = await getDatabaseAsync();

    return await database
      .update(scenarios)
      .set(scenario)
      .where(eq(scenarios.id, scenario.id));
  } catch (error) {
    console.error("Error inserting scenario:", error);
    throw error;
  }
};

export const deleteScenario = async (id: number) => {
  try {
    const database = await getDatabaseAsync();

    return await database.delete(scenarios).where(eq(scenarios.id, id));
  } catch (error) {
    console.error("Error deleting scenario:", error);
    throw error;
  }
};

export type ScenarioStatistics = Awaited<
  ReturnType<typeof getScenarioStatistics>
>;
export type SummaryScenarios = Awaited<ReturnType<typeof getSummaryScenarios>>;
export type SummaryScenario = SummaryScenarios[number];
export type GetScenarioResult = Awaited<
  Omit<
    ReturnType<typeof getScenario>,
    "explanations" | "airportConditions_flow"
  > & {
    explanations: Explanation[];
    airportConditions_flow: FlowDirection;
  }
>;
export type Scenario = Omit<InferInsertModel<typeof scenarios>, "id"> & {
  id?: number;
};

// Shared fields (everything except `id`)
// This is done manually with zod instead of using drizzle-zod to save 137k in bundle size.
const scenarioFields = {
  canClear: z.boolean(),
  isValid: z.boolean(),
  views: z.number().int().default(0),
  plan_aid: z.string(),
  plan_alt: z.number().optional(),
  plan_bcn: z.number().optional(),
  plan_cid: z.number().int().optional(),
  plan_dep: z.string().optional(),
  plan_dest: z.string().optional(),
  plan_eq: z.string().optional(),
  plan_pilotName: z.string().optional(),
  plan_homeAirport: z.string().optional(),
  plan_rmk: z.string().optional(),
  plan_rte: z.string().optional(),
  plan_spd: z.number().optional(),
  plan_typ: z.string().optional(),
  plan_vatsimId: z.number().int(),
  craft_altitude: z.string().optional(),
  craft_clearanceLimit: z.string().optional(),
  craft_controllerName: z.string().optional(),
  craft_frequency: z.number().optional(),
  craft_route: z.string().optional(),
  craft_telephony: z.string().optional(),
  airportConditions_flow: z.enum(["NORTH", "SOUTH", "EAST", "WEST"]).optional(),
  airportConditions_altimeter: z.number().optional(),
  airportConditions_departureOnline: z.boolean().default(false),
};

// Insert schema (id is excluded, views and departureOnline can default)
export const scenarioInsertSchema = z
  .object({
    ...scenarioFields,
  })
  .partial({ views: true, airportConditions_departureOnline: true });

// Update schema (id is required, everything else optional)
export const scenarioUpdateSchema = z
  .object({
    id: z.number().int(),
  })
  .merge(z.object(scenarioFields).partial());
