"use server";

import { postJson } from "@/lib/api";
import { unflatten } from "@workspace/plantools";
import { Scenario, ScenarioSchema } from "@workspace/validators";

interface ScenarioFormState {
  success: boolean;
  message?: string;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
}

function assertObject(
  value: unknown
): asserts value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    throw new Error("Expected an object");
  }
}

// A lot of how this woks comes from https://dev.to/emmanuel_xs/how-to-use-react-hook-form-with-useactionstate-hook-in-nextjs15-1hja.
export const onSubmitScenario = async (
  _prevState: ScenarioFormState,
  payload: FormData
): Promise<ScenarioFormState> => {
  if (!(payload instanceof FormData)) {
    return {
      success: false,
      message: "Invalid payload",
    };
  }

  const formData = unflatten(Object.fromEntries(payload));

  // Fix up the booleans
  formData.isValid = formData.isValid === "true" || formData.isValid === true;
  formData.canClear =
    formData.canClear === "true" || formData.canClear === true;

  assertObject(formData.plan);
  formData.plan.alt = Number(formData.plan.alt);
  formData.plan.bcn = Number(formData.plan.bcn);
  formData.plan.cid = Number(formData.plan.cid);
  formData.plan.spd = Number(formData.plan.spd);
  formData.plan.vatsimId = Number(formData.plan.vatsimId);

  const scenario = ScenarioSchema.safeParse(formData);

  if (!scenario.success) {
    const errors = scenario.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = JSON.stringify(formData[key]);
    }

    console.log(`Schema validation errors: ${JSON.stringify(errors)}`);

    return {
      success: false,
      fields,
      errors,
    };
  }

  try {
    const response = await postJson<Scenario>("/scenarios", scenario.data);

    if (!response) {
      return {
        success: false,
        message: "Unable to save the scenario.",
      };
    }
  } catch (err) {
    console.error("Network error", err);
  }

  return {
    success: true,
    message: "Scenario saved!",
  };
};
