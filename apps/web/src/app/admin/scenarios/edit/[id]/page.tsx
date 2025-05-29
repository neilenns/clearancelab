"use server";

import { AdminHeader } from "@/components/admin-header";
import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import { getScenario } from "@/db/scenarios";
import { Suspense } from "react";
import Loading from "./loading";
import NotFound from "./not-found";

type Parameters = Promise<{ id: string }>;

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const scenario = await getScenario(Number(id));

  if (!scenario) {
    return <NotFound id={id} />;
  }

  // Older scenarios may some fields missing. If they're undefined set them to the empty
  // string to ensure there aren't errors from React about going from uncontrolled to controlled
  // when a value is set.
  scenario.plan_homeAirport ??= "";
  scenario.craft_controllerName ??= "";

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
