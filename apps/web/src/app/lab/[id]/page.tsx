"use server";

import { fetchScenarios } from "@/api/fetch-scenarios";
import { getJson } from "@/lib/api";
import { getAuth0Client } from "@/lib/auth0";
import { ENV } from "@/lib/environment";
import { Scenario } from "@workspace/validators";
import ClientSection from "./client-section";
import NotFound from "./not-found";

type Parameters = Promise<{ id: string }>;

// This is the name that next.js uses for the function, it cannot be renamed.
// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const scenarios = await fetchScenarios({ summary: true });

  return scenarios.map((scenario) => ({ id: scenario._id }));
}

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const response = await getJson<Scenario>(`/scenarios/${id}`);
  const scenario = response?.data;

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
