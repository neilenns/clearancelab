"use server";

import { getJson } from "@/lib/api";

/**
 * Fetches a scenario by its ID, casting it to the requested
 * @param id The ID of the scenario to fetch.
 * @type T The type to cast the results to.
 * @returns The fetched scenario data or undefined if not found.
 */
export const fetchScenarioById = async <T,>(
  id: string,
): Promise<T | undefined> => {
  const response = await getJson<T>(`/scenarios/${id}`);
  const scenario = response?.data;

  return scenario;
};
