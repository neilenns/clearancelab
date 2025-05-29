import { ExplanationInsertModel } from "@/db/explanations";
import { ScenarioInsertModel, scenarioInsertSchema } from "@/db/scenarios";
import { explanationsArraySchema } from "@/db/schema";
import {
  convertToBoolean,
  convertToNumber,
  unflatten,
} from "@workspace/plantools";
import { revalidatePath } from "next/cache";

export type OnSubmitScenarioState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  id?: number;
  hasSubmitted: boolean;
};

export type TransformResult =
  | {
      success: true;
      data: {
        scenario: ScenarioInsertModel;
        explanations: ExplanationInsertModel[];
      };
    }
  | {
      success: false;
      errors?: Record<string, string[]>;
      fields?: Record<string, string>;
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

  if (formData.id === "") formData.id = undefined;

  formData.isValid = convertToBoolean(formData.isValid);
  formData.canClear = convertToBoolean(formData.canClear);
  formData.airportConditions_departureOnline = convertToBoolean(
    formData.airportConditions_departureOnline,
  );

  formData.plan_alt = convertToNumber(formData.plan_alt);
  formData.plan_bcn = convertToNumber(formData.plan_bcn);
  formData.plan_cid = convertToNumber(formData.plan_cid);
  formData.plan_spd = convertToNumber(formData.plan_spd);
  formData.plan_vatsimId = convertToNumber(formData.plan_vatsimId);
  formData.airportConditions_altimeter = convertToNumber(
    formData.airportConditions_altimeter,
  );
  formData.craft_frequency = convertToNumber(formData.craft_frequency);

  const parsedScenario = scenarioInsertSchema.safeParse(formData);

  if (!parsedScenario.success) {
    console.log(
      `Schema validation errors: ${JSON.stringify(parsedScenario.error)}`,
    );

    return {
      success: false,
    };
  }

  // Now handle the explanations:
  const explanationsObject = formData.explanations ?? {};
  // Convert id and scenarioId to numbers for each explanation
  const explanationsArray = Object.values(explanationsObject).map(
    (explanation) => ({
      ...explanation,
      id: convertToNumber(explanation.id),
      scenarioId: convertToNumber(explanation.scenarioId),
    }),
  );
  const parsedExplanations =
    explanationsArraySchema.safeParse(explanationsArray);

  if (!parsedExplanations.success) {
    console.log(
      `Schema validation errors: ${JSON.stringify(parsedExplanations.error)}`,
    );

    return {
      success: false,
    };
  }

  return {
    success: true,
    data: {
      scenario: parsedScenario.data,
      explanations: parsedExplanations.data,
    },
  };
}

export function revalidateAfterSave(id?: number) {
  if (id) {
    revalidatePath(`/lab/${id.toString()}`);
  }
  revalidatePath("/lab");
  revalidatePath("/admin/scenarios");
  revalidatePath("/admin/statistics");
}
