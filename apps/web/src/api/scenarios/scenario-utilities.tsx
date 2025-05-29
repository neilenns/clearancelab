// prettier-multiline-arrays-set-threshold: 1
// prettier-multiline-arrays-set-line-pattern: 4
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
      errors: {
        payload: [
          "Invalid payload",
        ],
      },
      fields: {},
    };
  }

  const conversionMap = {
    boolean: [
      "isValid", "canClear", "airportConditions_departureOnline",
    ],
    number: [
      "id", "plan_alt", "plan_bcn", "plan_cid",
      "plan_spd", "plan_vatsimId", "airportConditions_altimeter", "craft_frequency",
    ],
  };

  // Unflatten the properties. This gets the explanations as a nested array of objects.
  const formData = unflatten(Object.fromEntries(payload));

  // Clean up the properties that need type conversions
  if (formData.id === "") formData.id = undefined;

  for (const key of conversionMap.boolean) {
    if (key in formData) formData[key] = convertToBoolean(formData[key]);
  }

  for (const key of conversionMap.number) {
    if (key in formData) formData[key] = convertToNumber(formData[key]);
  }

  // Validate the data
  const parsedScenario = scenarioInsertSchema.safeParse(formData);

  if (!parsedScenario.success) {
    console.log(
      `Schema validation errors: ${JSON.stringify(parsedScenario.error)}`,
    );

    return {
      success: false,
    };
  }

  // Now handle the explanations
  const explanationsObject = formData.explanations ?? {};

  // Convert properties to numbers for each explanation
  const explanationsArray = Object.values(explanationsObject).map(
    (explanation) => ({
      ...explanation,
      id: convertToNumber(explanation.id),
      scenarioId: convertToNumber(explanation.scenarioId),
      order: convertToNumber(explanation.order),
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
