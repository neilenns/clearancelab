"use client";

import { deleteScenario } from "@/api/scenarios/delete-scenario";

export const useDeleteScenario = () => {
  return async (scenarioId: string | undefined) => {
    if (!scenarioId) {
      console.error("Scenario ID is missing");
      return;
    }

    try {
      const result = await deleteScenario(scenarioId);
    } catch (error) {
      console.error(`Failed to delete scenario: ${error}`);
    }
  };
};
