"use server";

import { getJson } from "@/lib/api";
import {
  fetchScenariosResponseSchema,
  fetchScenariosSummaryResponseSchema,
} from "@workspace/validators";

/**
 * Fetches scenarios based on the provided options.
 * @returns An array of fetched scenarios.
 */
export const fetchScenarios = async () => {
  const response = await getJson("/scenarios");

  if (!response.ok) {
    throw new Error("Failed to fetch full scenario list.");
  }

  const data = await response.json();
  return fetchScenariosResponseSchema.parse(data);
};

/**
 * Fetches the summary of scenarios.
 * @returns An array of scenarios summary.
 */
export const fetchScenariosSummary = async () => {
  const response = await getJson(`/scenarios/summary`);

  if (!response.ok) {
    throw new Error("Failed to fetch scenario summaries.");
  }

  const data = await response.json();
  return fetchScenariosSummaryResponseSchema.parse(data);
};
