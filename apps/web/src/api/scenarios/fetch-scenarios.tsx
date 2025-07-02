"use server";

import { connectToDatabase } from "@/lib/database";
import { ScenarioModel } from "@/models/scenario";
import { GenericErrorResponse } from "@workspace/validators";

interface FetchScenarioOptions {
  includeDrafts: boolean;
}

/**
 * Fetches scenarios based on the provided options.
 * @returns An array of fetched scenarios.
 */
export const fetchScenarios = async () => {
  try {
    await connectToDatabase();
    const scenarios = await ScenarioModel.findScenarios([]);

    return {
      success: true,
      data: scenarios.map((scenario) => ({
        ...scenario,
        _id: scenario._id.toString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching scenarios:", error);
    const fetchResponse: GenericErrorResponse = {
      success: false,
      message: "An error occurred while fetching scenarios.",
    };

    return fetchResponse;
  }
};

/**
 * Fetches the summary of scenarios.
 * @param options - Configuration options for the query
 * @returns An array of scenarios summary.
 */
export const fetchScenariosSummary = async ({
  includeDrafts,
}: FetchScenarioOptions) => {
  try {
    await connectToDatabase();
    const scenarios = await ScenarioModel.findSummary([], includeDrafts);

    return {
      success: true,
      data: scenarios.map((scenario) => ({
        ...scenario,
        _id: scenario._id.toString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching scenarios summary:", error);
    const fetchResponse: GenericErrorResponse = {
      success: false,
      message: "An error occurred while fetching scenarios summary.",
    };

    return fetchResponse;
  }
};
