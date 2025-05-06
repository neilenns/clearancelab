import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import { SiteHeader } from "@/components/site-header";
import { getRandomScenario } from "@workspace/plantools";

const defaultValues = getRandomScenario();

export default function NewScenarioPage() {
  return (
    <div>
      <SiteHeader title="New scenario" />
      <main className="p-4">
        <ScenarioForm defaultValues={defaultValues} />
      </main>
    </div>
  );
}
