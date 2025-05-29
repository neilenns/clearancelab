"use server";

import { insertExplanation } from "@/db/explanations";
import { insertScenario } from "@/db/scenarios";
import type { OnSubmitScenarioState } from "./scenario-utilities";
import { revalidateAfterSave, transformFormData } from "./scenario-utilities";

export const addScenario = async (
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

  try {
    // Start by saving the scenario. This returns the ID that's needed to associate the explanations
    // to the scenario.
    const insertedId = (await insertScenario(parsed.data.scenario))[0]
      .insertedId;

    parsed.data.explanations.forEach(async (explanation) => {
      await insertExplanation({
        ...explanation,
        id: undefined,
        scenarioId: insertedId,
      });
    });

    revalidateAfterSave(insertedId);

    return {
      success: true,
      hasSubmitted: true,
      message: "Scenario saved!",
      id: insertedId,
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
