import {
  assertObject,
  convertToBoolean,
  convertToNumber,
  unflatten,
} from "@workspace/plantools";
import { Scenario, scenarioSchema } from "@workspace/validators";
import { revalidatePath } from "next/cache";

export type OnSubmitScenarioState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  id?: string;
  hasSubmitted: boolean;
};

export type TransformResult =
  | { success: true; data: Scenario }
  | {
      success: false;
      errors: Record<string, string[]>;
      fields: Record<string, string>;
    };

export function transformFormData(payload: FormData): TransformResult {
  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { payload: ["Invalid payload"] },
      fields: {},
    };
  }

  const formData = unflatten(Object.fromEntries(payload));

  assertObject(formData.airportConditions);
  assertObject(formData.plan);
  assertObject(formData.craft);

  if (formData._id === "") formData._id = undefined;

  const explanationsObject = formData.explanations ?? {};
  const explanationsArray = Object.values(explanationsObject);

  formData.isValid = convertToBoolean(formData.isValid);
  formData.canClear = convertToBoolean(formData.canClear);
  formData.airportConditions.departureOnline = convertToBoolean(
    formData.airportConditions.departureOnline,
  );

  formData.plan.alt = convertToNumber(formData.plan.alt);
  formData.plan.bcn = convertToNumber(formData.plan.bcn);
  formData.plan.cid = convertToNumber(formData.plan.cid);
  formData.plan.spd = convertToNumber(formData.plan.spd);
  formData.plan.vatsimId = convertToNumber(formData.plan.vatsimId);
  formData.airportConditions.altimeter = convertToNumber(
    formData.airportConditions.altimeter,
  );
  formData.craft.frequency = convertToNumber(formData.craft.frequency);

  const toParse = {
    ...formData,
    explanations: explanationsArray,
  };

  const parsed = scenarioSchema.safeParse(toParse);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
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

  return {
    success: true,
    data: parsed.data,
  };
}

export function revalidateAfterSave(id?: string) {
  if (id) {
    revalidatePath(`/lab/${id}`);
  }
  revalidatePath("/lab");
}
