"use server";

import { getJson } from "@/lib/api";

export const fetchScenarioById = async <T,>(
  id: string,
): Promise<T | undefined> => {
  const response = await getJson<T>(`/scenarios/${id}`);
  const scenarios = response?.data;

  return scenarios;
};
