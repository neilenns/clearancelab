"use server";

import { deleteScenario } from "@/db/scenarios";
import { revalidatePath } from "next/cache";

export const handleDeleteScenario = async (id: number) => {
  try {
    await deleteScenario(id);

    revalidatePath(`/lab/${id.toString()}`);
    revalidatePath("/lab");
  } catch (error) {
    console.error("Error deleting scenario:", error);
    throw new Error("Failed to delete scenario");
  }
};
