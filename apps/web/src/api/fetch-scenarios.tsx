"use server";

import { getJson } from "@/lib/api";
import { Scenario } from "@workspace/validators";

interface FetchScenariosOptions {
  summary?: boolean;
}

/**
 * Fetches scenarios based on the provided options.
 * @param options The options for fetching scenarios.
 * @returns An array of fetched scenarios.
 */
export const fetchScenarios = async (
  options: FetchScenariosOptions = {},
): Promise<Scenario[]> => {
  const { summary = false } = options;
  const response = await getJson<Scenario[]>(`/scenarios/?summary=${summary}`);
  const scenarios = response?.data ?? [];

  return scenarios;
};
