"use server";

import { getJson } from "@/lib/api";
import { fetchScenariosResponseSchema, Scenario } from "@workspace/validators";

export interface fetchScenariosByIdsOptions {
  batchSize?: number;
}

/**
 * Fetches a list of scenarios by IDs.
 * @param scenarioIds The IDs of the scenario to fetch.
 * @returns The fetched scenarios.
 */
export const fetchScenariosByIds = async (
  scenarioIds: string[],
  options?: { batchSize?: number },
) => {
  if (!scenarioIds || scenarioIds.length === 0) {
    return [];
  }

  // This method of fetching in batches comes from
  // https://github.com/jacksonkasi1/tnks-data-table/blob/main/src/api/user/fetch-users-by-ids.ts
  const batchSize = options?.batchSize ?? 50;
  const results: Scenario[] = [];

  for (let index = 0; index < scenarioIds.length; index += batchSize) {
    const batchIds = scenarioIds.slice(index, index + batchSize);

    try {
      // Build parameter string with multiple IDs
      const parameters = new URLSearchParams();

      // Add each ID as a separate "id" parameter
      for (const id of batchIds) {
        parameters.append("id", id.toString());
      }

      parameters.append("limit", "1000");

      const response = await getJson(`/scenarios?${parameters.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch scenarios: ${response.statusText}`);
      }

      const data = await response.json();
      const parsedData = fetchScenariosResponseSchema.parse(data);

      if (!parsedData.success || !parsedData.data) {
        throw new Error("Invalid response data");
      }

      // Add the batch results to our collection
      // Filter to ensure we only include scenarios that were requested
      const validScenarios = parsedData.data.filter((scenario) =>
        batchIds.includes(scenario._id ?? ""),
      );

      results.push(...validScenarios);
    } catch (error) {
      console.error(`Error fetching batch of scenarios:`, error);
      // Continue with the next batch even if this one failed
    }
  }

  // Create a map of scenario ID to scenario to eliminate potential duplicates
  const scenarioMap = new Map<string, Scenario>();
  for (const scenario of results) {
    if (!scenario._id) {
      console.warn("Scenario missing ID:", scenario);
      continue;
    }
    scenarioMap.set(scenario._id, scenario);
  }

  // Find which user IDs we're missing
  const foundIds = new Set(scenarioMap.keys());
  const missingIds = scenarioIds.filter((id) => !foundIds.has(id));

  if (missingIds.length > 0) {
    console.warn(
      `Failed to fetch data for ${missingIds.length} scenarios: ${missingIds.join(", ")}`,
    );
  }

  // Return the results in the same order as the input IDs where possible
  return scenarioIds
    .map((id) => scenarioMap.get(id))
    .filter((scenario): scenario is Scenario => scenario !== undefined);
};
