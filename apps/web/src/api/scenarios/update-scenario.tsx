"use server";

import { putJson } from "@/lib/api";
import { addOrUpdateScenarioResponseSchema } from "@workspace/validators";
import type { OnSubmitScenarioState } from "./scenario-utilities";
import { revalidateAfterSave, transformFormData } from "./scenario-utilities";

export const updateScenario = async (
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

  if (!parsed.data._id) {
    return {
      success: false,
      hasSubmitted: true,
      message: "Scenario ID is required.",
    };
  }

  try {
    const response = await putJson(
      `/scenarios/${parsed.data._id.toString()}`,
      parsed.data,
      { withAuthToken: true },
    );

    if (!response.ok) throw new Error("Failed to update scenario.");

    const json = await response.json();
    const parsedResponse = addOrUpdateScenarioResponseSchema.safeParse(json);
    if (!parsedResponse.success)
      throw new Error("Invalid server response format.");

    revalidateAfterSave(parsedResponse.data.data?._id);

    return {
      success: true,
      hasSubmitted: true,
      message: "Scenario updated!",
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
