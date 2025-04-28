"use server";

import { postJson } from "@/lib/api";
import {
  convertToBoolean,
  convertToNumber,
  unflatten,
} from "@workspace/plantools";
import { Scenario, ScenarioSchema } from "@workspace/validators";

export type ScenarioFormState = {
  success: boolean;
  message?: string;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
} | null;

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
  formData.isValid = convertToBoolean(formData.isValid);
  formData.canClear = convertToBoolean(formData.canClear);

  // Fix up the numbers
  assertObject(formData.plan);
  formData.plan.alt = convertToNumber(formData.plan.alt);
  formData.plan.bcn = convertToNumber(formData.plan.bcn);
  formData.plan.cid = convertToNumber(formData.plan.cid);
  formData.plan.spd = convertToNumber(formData.plan.spd);
  formData.plan.vatsimId = convertToNumber(formData.plan.vatsimId);

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
    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }

  return {
    success: true,
    message: "Scenario saved!",
  };
};
