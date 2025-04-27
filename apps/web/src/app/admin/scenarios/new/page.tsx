import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import { getRandomScenario } from "@workspace/plantools";

const defaultValues = getRandomScenario();

export default function NewScenarioPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Scenario</h1>
      <ScenarioForm defaultValues={defaultValues} />
    </div>
  );
}
