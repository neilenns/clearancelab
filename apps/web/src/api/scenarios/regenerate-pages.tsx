"use server";

import { getSummaryScenarios } from "@/db/scenarios";
import { revalidatePath } from "next/cache";

export const handleRegeneratePages = async () => {
  try {
    const scenarios = await getSummaryScenarios();

    console.log("Regenerating pages");

    // Revalidate all of the scenario pages
    for (const scenario of scenarios) {
      revalidatePath(`/lab/${scenario.id.toString()}`);
    }

    // The rest of the pages
    revalidatePath(`/lab`);
    revalidatePath("/admin/scenarios");
    revalidatePath("/admin/statistics");
  } catch (error) {
    console.error("Couldn't regenerate pages:", error);
  }
};
