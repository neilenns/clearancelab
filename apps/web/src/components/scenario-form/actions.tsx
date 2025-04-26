"use server";
// This method of handling form data comes from
// https://dev.to/emmanuel_xs/how-to-use-react-hook-form-with-useactionstate-hook-in-nextjs15-1hja

import { postJson } from "@/lib/api";
import { Scenario, ScenarioSchema } from "@workspace/validators";

interface FormState {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
}

export const onSubmitScenario = async (
  _prevState: FormState,
  payload: FormData
): Promise<FormState> => {
  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { error: ["Invalid form data."] },
    };
  }

  const formData = Object.fromEntries(payload);
  const Scenario = ScenarioSchema.safeParse(formData);

  if (!Scenario.success) {
    const errors = Scenario.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      fields[key] = formData[key].toString();
    }

    return {
      success: false,
      fields,
      errors,
    };
  }

  try {
    const response = await postJson<Scenario>("/scenarios", Scenario.data);

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
