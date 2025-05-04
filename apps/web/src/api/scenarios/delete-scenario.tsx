"use server";

import { apiDelete } from "@/lib/api";
import { revalidatePath } from "next/cache";

export const deleteScenario = async (id: string): Promise<boolean> => {
  const result = await apiDelete(`/scenarios/${id}`, { withAuthToken: true });
  const success = result?.status === 204;

  if (result) {
    revalidatePath(`/lab/${id}`);
    revalidatePath("/lab");
  }

  return success;
};
