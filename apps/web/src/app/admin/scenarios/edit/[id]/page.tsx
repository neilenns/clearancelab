"use server";
import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import { apiFetch } from "@/lib/api";
import NotFound from "./not-found";
import { ScenarioInput } from "@workspace/validators";
import { Suspense } from "react";
import Loading from "./loading";

type Parameters = Promise<{ id: string }>;

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const scenario = await apiFetch<ScenarioInput>(`/scenarios/${id}`);

  if (!scenario) {
    return <NotFound id={id} />;
  }

  // Older scenarios may not have a home airport. If there isn't one defined set it to the empty
  // string to ensure there aren't errors from React about going from uncontrolled to controlled
  // when a value is set.
  scenario.plan.homeAirport ??= "";

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Scenario</h1>
      <Suspense fallback={<Loading />}>
        <ScenarioForm defaultValues={scenario} />
      </Suspense>
    </div>
  );
}
