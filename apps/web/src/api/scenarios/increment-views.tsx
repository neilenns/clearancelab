"use server";

import { postJson } from "@/lib/api";

export const incrementViews = async (id?: string): Promise<void> => {
  if (!id) {
    throw new Error("Scenario ID is required to increment views.");
  }

  try {
    await postJson(`/scenarios/increment-views`, {
      id,
    });
  } catch (error: unknown) {
    console.error("Failed to increment scenario views:", error);
    throw new Error(`Failed to increment views for scenario ${id}: ${error}`);
  }
};
