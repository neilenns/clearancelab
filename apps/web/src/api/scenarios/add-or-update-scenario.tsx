import { addScenario } from "./add-scenario";
import { OnSubmitScenarioState } from "./scenario-utilities";
import { updateScenario } from "./update-scenario";

export const addOrUpdateScenario = async (
  previous: OnSubmitScenarioState,
  payload: FormData,
): Promise<OnSubmitScenarioState> => {
  const isEdit = payload.get("_id")?.toString().trim();

  return isEdit
    ? updateScenario(previous, payload)
    : addScenario(previous, payload);
};
