"use server";

import { getScenario } from "@/db/scenarios";
import ClientSection from "./client-section";
import NotFound from "./not-found";

type Parameters = Promise<{ id: string }>;

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const scenario = await getScenario(Number(id));

  if (!scenario) {
    return <NotFound id={id} />;
  }

  return <ClientSection aria-label="Scenario viewer" scenario={scenario} />;
}
