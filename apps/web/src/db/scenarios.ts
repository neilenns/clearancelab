import { count, eq, InferInsertModel, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
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

export const insertScenario = async (scenario: ScenarioInsertModel) => {
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

export const updateScenario = async (scenario: ScenarioInsertModel) => {
  if (!scenario.id) {
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
export type Scenario = NonNullable<GetScenarioResult>;
export type ScenarioInsertModel = InferInsertModel<typeof scenarios>;

export const scenarioInsertSchema = createInsertSchema(scenarios);
