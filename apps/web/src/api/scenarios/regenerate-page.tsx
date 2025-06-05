"use server";

import { revalidatePath } from "next/cache";
import { fetchScenariosSummary } from "./fetch-scenarios";

export const regenerateScenario = async (id: string) => {
  revalidatePath(`/lab/${id}`);
};

export const regeneratePages = async () => {
  const scenarios = await fetchScenariosSummary({ includeDrafts: true });

  if (scenarios.success) {
    for (const scenario of scenarios.data) {
      revalidatePath(`/lab/${scenario._id}`);
    }
  }

  revalidatePath("/lab");
  revalidatePath("/admin/scenarios");
  revalidatePath("/admin/statistics");
};
