"use client";

import { deleteScenario } from "@/api/scenarios/delete-scenario";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Options = {
  redirect?: boolean;
};

export const useDeleteScenario = () => {
  const router = useRouter();

  return async (scenarioId: string | undefined, options: Options = {}) => {
    if (!scenarioId) {
      console.error("Scenario ID is missing");
      return;
    }

    const result = await deleteScenario(scenarioId);

    if (result) {
      if (options.redirect !== false) {
        router.replace("/lab");
      }
    } else {
      toast.error("Unable to delete scenario.");
    }
  };
};
