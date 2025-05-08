"use server";

import { apiDelete } from "@/lib/api";
import { revalidatePath } from "next/cache";

export const deleteScenario = async (id: string) => {
  try {
    const result = await apiDelete(`/scenarios/${id}`, { withAuthToken: true });

    if (!result.ok) {
      const errorText = await result.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to delete scenario: ${result.status} ${errorText}`,
      );
    }

    // The delete response returns a DeleteScenarioResponse, but there's no reason
    // to parse it since all we care about is the result succeeding.
    revalidatePath(`/lab/${id}`);
    revalidatePath("/lab");
  } catch (error) {
    console.error("Error deleting scenario:", error);
    throw new Error("Failed to delete scenario");
  }
};
