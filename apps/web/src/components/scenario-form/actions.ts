"use server";

import { apiFetch, postJson, putJson } from "@/lib/api";
import {
  convertToBoolean,
  convertToNumber,
  unflatten,
} from "@workspace/plantools";
import { Plan, Scenario, ScenarioSchema } from "@workspace/validators";
import { revalidatePath } from "next/cache";

export type OnSubmitScenarioState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
} | null;

export type FetchPlanByCallsignState =
  | {
      success: true;
      plan: Plan;
    }
  | {
      success: false;
      message: string;
    };

function assertObject(
  value: unknown
): asserts value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    throw new Error("Expected an object");
  }
}

export async function fetchPlanByCallsign(
  callsign: string
): Promise<FetchPlanByCallsignState> {
  const requestedCallsign = callsign.toUpperCase().trim();

  if (!requestedCallsign) {
    return {
      success: false,
      message: "Please enter a callsign.",
    };
  }

  const plan = await apiFetch<Plan>(`/vatsim/flightplan/${requestedCallsign}`);

  if (!plan) {
    return {
      success: false,
      message: `No flight plan found for ${requestedCallsign}.`,
    };
  }

  return {
    success: true,
    plan,
  };
}

// A lot of how this works comes from https://dev.to/emmanuel_xs/how-to-use-react-hook-form-with-useactionstate-hook-in-nextjs15-1hja.
export const onSubmitScenario = async (
  _prevState: OnSubmitScenarioState,
  payload: FormData
): Promise<OnSubmitScenarioState> => {
  if (!(payload instanceof FormData)) {
    return {
      success: false,
      message: "Invalid payload",
    };
  }

  const formData = unflatten(Object.fromEntries(payload));
  assertObject(formData.airportConditions);
  assertObject(formData.plan);

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
    formData.airportConditions.departureOnline
  );

  // Fix up the numbers
  formData.plan.alt = convertToNumber(formData.plan.alt);
  formData.plan.bcn = convertToNumber(formData.plan.bcn);
  formData.plan.cid = convertToNumber(formData.plan.cid);
  formData.plan.spd = convertToNumber(formData.plan.spd);
  formData.plan.vatsimId = convertToNumber(formData.plan.vatsimId);
  formData.airportConditions.altimeter = convertToNumber(
    formData.airportConditions.altimeter
  );

  const toParse = {
    ...formData,
    explanations: explanationsArray,
  };
  const scenario = ScenarioSchema.safeParse(toParse);

  if (!scenario.success) {
    const errors = scenario.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = JSON.stringify(formData[key]);
    }

    console.log(`Schema validation errors: ${JSON.stringify(errors)}`);

    return {
      success: false,
      message: "Validation failed",
      fields,
      errors,
    };
  }

  const isEdit = Boolean(scenario.data._id);

  try {
    let response: Scenario | null = null;
    if (scenario.data._id) {
      console.debug(`Updating scenario ${scenario.data._id.toString()}`);
      response = await putJson<Scenario>(
        `/scenarios/${scenario.data._id.toString()}`,
        scenario.data,
        { withAuthToken: true }
      );
    } else {
      console.debug("Saving new scenario");
      response = await postJson<Scenario>("/scenarios", scenario.data, {
        withAuthToken: true,
      });
    }

    if (!response) {
      return {
        success: false,
        message: `Unable to ${isEdit ? "update" : "save"} the scenario.`,
      };
    }

    if (response._id) {
      const cachePath = `/lab/${response._id.toString()}`;

      revalidatePath(cachePath);
      revalidatePath("/lab");
    }

    return {
      success: true,
      message: `Scenario ${isEdit ? "updated" : "saved"}!`,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: (err as Error).message,
    };
  }
};
