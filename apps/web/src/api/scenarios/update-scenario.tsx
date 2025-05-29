"use server";

import {
  deleteExplanationsForScenario,
  insertExplanation,
} from "@/db/explanations";
import { updateScenario } from "@/db/scenarios";
import type { OnSubmitScenarioState } from "./scenario-utilities";
import { revalidateAfterSave, transformFormData } from "./scenario-utilities";

export const handleUpdateScenario = async (
  _previous: OnSubmitScenarioState,
  payload: FormData,
): Promise<OnSubmitScenarioState> => {
  const parsed = transformFormData(payload);

  if (!parsed.success) {
    return {
      success: false,
      hasSubmitted: true,
      message: "Validation failed",
      fields: parsed.fields,
      errors: parsed.errors,
    };
  }

  const scenarioId = parsed.data.scenario.id;

  if (!scenarioId) {
    return {
      success: false,
      hasSubmitted: true,
      message: "Scenario ID is required.",
    };
  }

  try {
    // Update the scenario first
    await updateScenario(parsed.data.scenario);

    // Then delete any explanations that were attached to the scenario
    await deleteExplanationsForScenario(scenarioId);

    // Then add back in the explanations
    // Add all the explanations
    await Promise.all(
      parsed.data.explanations.map((explanation) =>
        insertExplanation({
          ...explanation,
          id: undefined, // This will get created by the database automatically
          scenarioId,
        }),
      ),
    );

    revalidateAfterSave(scenarioId);

    return {
      success: true,
      hasSubmitted: true,
      message: "Scenario updated!",
      id: parsed.data.scenario.id,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      hasSubmitted: true,
      message: (error as Error).message,
    };
  }
};
