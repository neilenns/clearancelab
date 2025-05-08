import { AdminHeader } from "@/components/admin-header";
import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import { getRandomScenario } from "@workspace/plantools";

const defaultValues = getRandomScenario();

export default function NewScenarioPage() {
  return (
    <div>
      <AdminHeader />
      <main className="p-4">
        <ScenarioForm defaultValues={defaultValues} />
      </main>
    </div>
  );
}
