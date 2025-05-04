"use server";

import { apiFetch } from "@/lib/api";
import { getAuth0Client } from "@/lib/auth0";
import { ENV } from "@/lib/environment";
import { Scenario } from "@workspace/validators";
import ClientSection from "./client-section";
import NotFound from "./not-found";

type Parameters = Promise<{ id: string }>;

// This is the name that next.js uses for the function, it cannot be renamed.
// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const scenarios = await apiFetch<Scenario[]>("/scenarios/");

  if (!scenarios) {
    return [];
  }

  return scenarios.data.map((scenario) => ({ id: scenario._id }));
}

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const scenario = await apiFetch<Scenario>(`/scenarios/${id}`);
  const session = ENV.AUTH_DISABLED
    ? undefined
    : await getAuth0Client().getSession();

  if (!scenario) {
    return <NotFound id={id} />;
  }

  return (
    <ClientSection
      aria-label="Scenario viewer"
      scenario={scenario.data}
      canEdit={Boolean(session) || ENV.AUTH_DISABLED}
    />
  );
}
