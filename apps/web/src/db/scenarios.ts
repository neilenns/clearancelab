import { getDatabaseAsync } from ".";

export const getScenario = async (id: number) => {
  try {
    const database = await getDatabaseAsync();

    return database.query.scenarios.findFirst({
      where: (scenarios, { eq }) => eq(scenarios.id, id),
      with: {
        explanations: true,
        craft: true,
        plan: {
          with: {
            depAirportInfo: true,
            destAirportInfo: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching scenario:", error);
    throw new Error("Failed to fetch scenario");
  }
};
