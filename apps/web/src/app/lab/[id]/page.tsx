"use server";

import { fetchScenariosSummary } from "@/api/scenarios/fetch-scenarios";
import { fetchScenarioById } from "@/api/scenarios/fetch-scenarios-by-ids";
import { getAuth0Client } from "@/lib/auth0";
import { ENV } from "@/lib/environment";
import { Scenario } from "@workspace/validators";
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
  const scenario = await fetchScenarioById<Scenario>(id);

  if (!scenario) {
    return <NotFound id={id} />;
  }

  const session = ENV.AUTH_DISABLED
    ? undefined
    : await getAuth0Client().getSession();

  return (
    <ClientSection
      aria-label="Scenario viewer"
      scenario={scenario}
      canEdit={Boolean(session) || ENV.AUTH_DISABLED}
    />
  );
}
