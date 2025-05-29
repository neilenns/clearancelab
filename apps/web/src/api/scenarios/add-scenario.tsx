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
    // Save the scenario and retrieve the result
    const scenarioResult = await insertScenario(parsed.data.scenario);
    const insertedId = scenarioResult[0].insertedId;

    // Add all the explanations
    await Promise.all(
      parsed.data.explanations.map((explanation) =>
        insertExplanation({
          ...explanation,
          scenarioId: insertedId,
        }),
      ),
    );

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
