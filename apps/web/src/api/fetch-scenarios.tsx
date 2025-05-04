"use server";

import { apiFetch } from "@/lib/api";
import { Scenario } from "@workspace/validators";

interface FetchScenariosOptions {
  summary?: boolean;
}

export const fetchScenarios = async ({
  summary = false,
}: FetchScenariosOptions = {}): Promise<Scenario[]> => {
  const response = await apiFetch<Scenario[]>(`/scenarios/?summary=${summary}`);
  const scenarios = response?.data ?? [];

  return scenarios;
};
