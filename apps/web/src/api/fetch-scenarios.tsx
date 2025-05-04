"use server";

import { getJson } from "@/lib/api";
import { Scenario } from "@workspace/validators";

interface FetchScenariosOptions {
  summary?: boolean;
}

export const fetchScenarios = async ({
  summary = false,
}: FetchScenariosOptions = {}): Promise<Scenario[]> => {
  const response = await getJson<Scenario[]>(`/scenarios/?summary=${summary}`);
  const scenarios = response?.data ?? [];

  return scenarios;
};
