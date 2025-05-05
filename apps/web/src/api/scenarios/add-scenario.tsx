"use server";

import { postJson } from "@/lib/api";
import { addOrUpdateScenarioResponseSchema } from "@workspace/validators";
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
    const response = await postJson("/scenarios", parsed.data, {
      withAuthToken: true,
    });

    if (!response.ok) throw new Error("Failed to add scenario.");

    const json = await response.json();
    const parsedResponse = addOrUpdateScenarioResponseSchema.safeParse(json);

    if (!parsedResponse.success) {
      throw new Error("Invalid server response format.");
    }

    revalidateAfterSave(parsedResponse.data.data?._id);

    return {
      success: true,
      hasSubmitted: true,
      message: "Scenario saved!",
      id: parsedResponse.data.data?._id,
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
