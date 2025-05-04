"use server";

import { getJson } from "@/lib/api";
import { Scenario } from "@workspace/validators";

export const fetchScenarioById = async (
  id: string,
): Promise<Scenario | undefined> => {
  const response = await getJson<Scenario>(`/scenarios/${id}`);
  const scenarios = response?.data;

  return scenarios;
};
