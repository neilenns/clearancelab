import { handleAddScenario } from "./add-scenario";
import { OnSubmitScenarioState } from "./scenario-utilities";
import { handleUpdateScenario } from "./update-scenario";

export const addOrUpdateScenario = async (
  previous: OnSubmitScenarioState,
  payload: FormData,
): Promise<OnSubmitScenarioState> => {
  const isEdit = payload.get("id")?.toString().trim();

  return isEdit
    ? handleUpdateScenario(previous, payload)
    : handleAddScenario(previous, payload);
};
