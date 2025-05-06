"use server";
import { fetchScenariosByIds } from "@/api/scenarios/fetch-scenarios-by-ids";
import { ScenarioForm } from "@/components/scenario-form/scenario-form";
import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";
import Loading from "./loading";
import NotFound from "./not-found";

type Parameters = Promise<{ id: string }>;

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const scenarios = await fetchScenariosByIds([id]);

  if (scenarios.length === 0) {
    return <NotFound id={id} />;
  }

  const scenario = scenarios[0];

  // Older scenarios may not have a home airport. If there isn't one defined set it to the empty
  // string to ensure there aren't errors from React about going from uncontrolled to controlled
  // when a value is set.
  scenario.plan.homeAirport ??= "";

  return (
    <div>
      <SiteHeader />
      <main className="p-4" aria-label="Edit scenario form">
        <Suspense fallback={<Loading />}>
          <ScenarioForm defaultValues={scenario} />
        </Suspense>
      </main>
    </div>
  );
}
