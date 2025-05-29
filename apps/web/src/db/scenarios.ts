import { getDatabaseAsync } from ".";

export const getScenario = async (id: number) => {
  try {
    const database = await getDatabaseAsync();

    return database.query.scenarios.findFirst({
      where: (scenarios, { eq }) => eq(scenarios.id, id),
      with: {
        explanations: true,
        destAirportInfo: true,
        depAirportInfo: true,
      },
    });
  } catch (error) {
    console.error("Error fetching scenario:", error);
    throw new Error("Failed to fetch scenario");
  }
};

export const getSummaryScenarios = async () => {
  try {
    const database = await getDatabaseAsync();

    return database.query.scenarios.findMany({
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
  } catch (error) {
    console.error("Error fetching scenarios summary:", error);
    throw new Error("Failed to fetch scenarios summary");
  }
};

export type SummaryScenarios = Awaited<ReturnType<typeof getSummaryScenarios>>;
export type SummaryScenario = SummaryScenarios[number];
export type GetScenarioResult = Awaited<ReturnType<typeof getScenario>>;
export type Scenario = NonNullable<GetScenarioResult>;
