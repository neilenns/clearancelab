"use server";

import { postJson } from "@/lib/api";
import { ScenarioFormState } from "./scenario-form";
import { ScenarioInput, ScenarioSchema } from "@workspace/validators";

export const onSubmitScenario = async (
  _prevState: ScenarioFormState,
  payload: FormData
): Promise<ScenarioFormState> => {
  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { error: ["Invalid form data."] },
    };
  }

  const formData = Object.fromEntries(payload);
  const scenario = ScenarioSchema.safeParse(formData);

  if (!scenario.success) {
    const errors = scenario.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      fields[key] = formData[key].toString();
    }

    return {
      success: false,
      errors,
    };
  }

  try {
    const response = await postJson<ScenarioInput>("/scenarios", scenario.data);

    if (!response) {
      return {
        success: false,
        errors: { error: ["Unable to save the scenario."] },
      };
    }
  } catch (err) {
    console.error("Network error", err);
  }

  return {
    success: true,
  };
};
