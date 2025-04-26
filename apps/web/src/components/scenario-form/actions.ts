"use server";

import { ScenarioFormState } from "./scenario-form";

export const addScenario = async (
  initialState: ScenarioFormState,
  formData: FormData
): Promise<ScenarioFormState> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(formData);
  return initialState;
};
