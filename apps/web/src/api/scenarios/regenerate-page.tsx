"use server";

import { revalidatePath } from "next/cache";
import { fetchScenariosSummary } from "./fetch-scenarios";

export const regenerateScenario = async (id: string) => {
  try {
    revalidatePath(`/lab/${id}`);
  } catch (error) {
    console.error(`Failed to regenerate ${id}`, error);
    throw new Error("Failed to regenerate page");
  }
};

export const regeneratePages = async () => {
  try {
    const scenarios = await fetchScenariosSummary({ includeDrafts: true });

    if (scenarios.success) {
      for (const scenario of scenarios.data) {
        revalidatePath(`/lab/${scenario._id}`);
      }
    } else {
      console.error("Failed to fetch scenarios for regeneration");
    }

    revalidatePath("/lab");
    revalidatePath("/admin/scenarios");
    revalidatePath("/admin/statistics");
  } catch (error) {
    console.log("Failed to regenerate pages", error);
    throw new Error("Failed to regenerate pages");
  }
};
