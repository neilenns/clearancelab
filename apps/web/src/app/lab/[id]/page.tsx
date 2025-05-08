"use server";

import { fetchScenariosSummary } from "@/api/scenarios/fetch-scenarios";
import { fetchScenariosByIds } from "@/api/scenarios/fetch-scenarios-by-ids";
import { ENV } from "@/lib/environment";
import ClientSection from "./client-section";
import NotFound from "./not-found";

type Parameters = Promise<{ id: string }>;

// This is the name that next.js uses for the function, it cannot be renamed.
// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const response = await fetchScenariosSummary();
  const scenarios = response.success ? response.data : [];

  return scenarios.map((scenario) => ({ id: scenario._id }));
}

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const scenarios = await fetchScenariosByIds([id]);

  if (scenarios.length === 0) {
    return <NotFound id={id} />;
  }

  const scenario = scenarios[0];

  return (
    <ClientSection
      aria-label="Scenario viewer"
      scenario={scenario}
      disableAuth={ENV.DISABLE_AUTH}
    />
  );
}
