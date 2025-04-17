"use server";

import { ScenarioData } from "@/models/scenario";
import ClientSection from "./ClientSection";
import NotFound from "./notFound";
import { apiFetch } from "@/lib/api";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const scenarios = (await apiFetch<ScenarioData[]>("/scenarios/")) ?? [];
  return scenarios.map((scenario) => ({ id: scenario._id }));
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const scenario = await apiFetch<ScenarioData>(`/scenarios/${id}`);

  if (!scenario) {
    return <NotFound id={id} />;
  }

  return (
    <>
      <ClientSection scenario={scenario} />
    </>
  );
}
