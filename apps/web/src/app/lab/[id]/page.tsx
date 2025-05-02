"use server";

import { Scenario } from "@workspace/validators";
import ClientSection from "./client-section";
import NotFound from "./not-found";
import { apiFetch } from "@/lib/api";

type Parameters = Promise<{ id: string }>;

// This is the name that next.js uses for the function, it cannot be renamed.
// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const scenarios = (await apiFetch<Scenario[]>("/scenarios/")) ?? [];
  return scenarios.map((scenario) => ({ id: scenario._id }));
}

export default async function Page({ params }: { params: Parameters }) {
  const { id } = await params;
  const scenario = await apiFetch<Scenario>(`/scenarios/${id}`);

  if (!scenario) {
    return <NotFound id={id} />;
  }

  return <ClientSection scenario={scenario} />;
}
