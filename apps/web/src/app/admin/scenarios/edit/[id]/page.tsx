"use server";
import { fetchScenariosByIds } from "@/api/scenarios/fetch-scenarios-by-ids";
import { AdminHeader } from "@/components/admin-header";
import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import { Suspense } from "react";
import Loading from "./loading";
import NotFound from "./not-found";

export default async function Page({
  params,
}: PageProps<"/admin/scenarios/edit/[id]">) {
  const { id } = await params;
  const scenarios = await fetchScenariosByIds([id]);

  if (scenarios.length === 0) {
    return <NotFound id={id} />;
  }

  const scenario = scenarios[0];

  // Older scenarios may some fields missing. If they're undefined set them to the empty
  // string to ensure there aren't errors from React about going from uncontrolled to controlled
  // when a value is set.
  scenario.plan.homeAirport ??= "";
  if (scenario.craft) {
    scenario.craft.controllerName ??= "";
  }

  return (
    <div>
      <AdminHeader />
      <main className="p-4" aria-label="Edit scenario form">
        <Suspense fallback={<Loading />}>
          <ScenarioForm defaultValues={scenario} />
        </Suspense>
      </main>
    </div>
  );
}
