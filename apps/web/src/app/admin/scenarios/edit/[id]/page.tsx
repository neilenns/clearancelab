"use server";
import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import { apiFetch } from "@/lib/api";
import NotFound from "./notFound";
import { ScenarioInput } from "@workspace/validators";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const scenario = await apiFetch<ScenarioInput>(`/scenarios/${id}`);

  if (!scenario) {
    return <NotFound id={id} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Scenario</h1>
      <ScenarioForm defaultValues={scenario} />
    </div>
  );
}
