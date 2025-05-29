"use server";

import { getScenario, getSummaryScenarios } from "@/db/scenarios";
import ClientSection from "./client-section";
import NotFound from "./not-found";

type Parameters = Promise<{ id: string }>;

// This is the name that next.js uses for the function, it cannot be renamed.
// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const scenarios = await getSummaryScenarios();

  return scenarios.map((scenario) => ({ id: scenario.id }));
}

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const scenario = await getScenario(Number(id));

  if (!scenario) {
    return <NotFound id={id} />;
  }

  return <ClientSection aria-label="Scenario viewer" scenario={scenario} />;
}
