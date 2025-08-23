"use server";

import { fetchScenariosSummary } from "@/api/scenarios/fetch-scenarios";
import { fetchScenariosByIds } from "@/api/scenarios/fetch-scenarios-by-ids";
import ClientSection from "./client-section";
import NotFound from "./not-found";

// This is the name that next.js uses for the function, it cannot be renamed.
// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const response = await fetchScenariosSummary({ includeDrafts: false });
  const scenarios = response.success ? response.data : [];

  return scenarios.map((scenario) => ({ id: scenario._id }));
}

export default async function Page({ params }: PageProps<"/lab/[id]">) {
  const { id } = await params;
  const scenarios = await fetchScenariosByIds([id]);

  if (scenarios.length === 0) {
    return <NotFound id={id} />;
  }

  const scenario = scenarios[0];

  return <ClientSection aria-label="Scenario viewer" scenario={scenario} />;
}
