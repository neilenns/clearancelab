"use server";

import { postJson, putJson } from "@/lib/api";
import {
  assertObject,
  convertToBoolean,
  convertToNumber,
  unflatten,
} from "@workspace/plantools";
import {
  addOrUpdateScenarioResponseSchema,
  scenarioSchema,
} from "@workspace/validators";
import { revalidatePath } from "next/cache";

export type OnSubmitScenarioState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  id?: string;
  hasSubmitted: boolean;
};

// A lot of how this works comes from https://dev.to/emmanuel_xs/how-to-use-react-hook-form-with-useactionstate-hook-in-nextjs15-1hja.
export const addOrUpdateScenario = async (
  _previousState: OnSubmitScenarioState,
  payload: FormData,
): Promise<OnSubmitScenarioState> => {
  if (!(payload instanceof FormData)) {
    return {
      success: false,
      message: "Invalid payload",
      hasSubmitted: true,
    };
  }

  const formData = unflatten(Object.fromEntries(payload));

  assertObject(formData.airportConditions);
  assertObject(formData.plan);
  assertObject(formData.craft);

  // Fix up the ID. If it is an empty string, set it to undefined.
  if (formData._id === "") {
    formData._id = undefined;
  }

  // Fix up the explanations array
  const explanationsObject = formData.explanations ?? {};
  const explanationsArray = Object.values(explanationsObject);

  // Fix up the booleans
  formData.isValid = convertToBoolean(formData.isValid);
  formData.canClear = convertToBoolean(formData.canClear);

  formData.airportConditions.departureOnline = convertToBoolean(
    formData.airportConditions.departureOnline,
  );

  // Fix up the numbers
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
  const scenarioData = scenarioSchema.safeParse(toParse);

  if (!scenarioData.success) {
    const errors = scenarioData.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = JSON.stringify(formData[key]);
    }

    console.log(`Schema validation errors: ${JSON.stringify(errors)}`);

    return {
      success: false,
      hasSubmitted: true,
      message: "Validation failed",
      fields,
      errors,
    };
  }

  const isEdit = Boolean(scenarioData.data._id);

  try {
    let response;

    if (scenarioData.data._id) {
      console.debug(`Updating scenario ${scenarioData.data._id.toString()}`);
      response = await putJson(
        `/scenarios/${scenarioData.data._id.toString()}`,
        scenarioData.data,
        { withAuthToken: true },
      );
    } else {
      console.debug("Saving new scenario");
      response = await postJson("/scenarios", scenarioData.data, {
        withAuthToken: true,
      });
    }

    if (!response.ok) {
      throw new Error("Failed to add or update scenario.");
    }

    const data = await response.json();
    const scenarioResponse = addOrUpdateScenarioResponseSchema.safeParse(data);

    if (!scenarioResponse.success || !scenarioResponse.data) {
      console.error(
        `Failed to add or update scenario: ${JSON.stringify(
          scenarioResponse.error.flatten(),
        )}`,
      );
      return {
        success: false,
        hasSubmitted: true,
        message: `Unable to ${isEdit ? "update" : "save"} the scenario.`,
      };
    }

    const updatedScenario = scenarioResponse.data.data;

    if (updatedScenario) {
      const cachePath = `/lab/${updatedScenario._id}`;

      revalidatePath(cachePath);
      revalidatePath("/lab");
    }

    return {
      success: true,
      hasSubmitted: true,
      message: `Scenario ${isEdit ? "updated" : "saved"}!`,
      id: updatedScenario?._id,
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
