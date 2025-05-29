"use client";

import { handleDeleteScenario } from "@/api/scenarios/delete-scenario";

export const useDeleteScenario = () => {
  return async (scenarioId: number | undefined) => {
    if (!scenarioId) {
      console.error("Scenario ID is missing");
      return;
    }

    try {
      await handleDeleteScenario(scenarioId);
    } catch (error) {
      console.error(`Failed to delete scenario: ${error}`);
      throw error;
    }
  };
};
