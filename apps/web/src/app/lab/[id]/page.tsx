"use server";

import { Scenario } from "@workspace/validators";
import ClientSection from "./ClientSection";
import NotFound from "./notFound";
import { apiFetch } from "@/lib/api";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const scenario = await apiFetch<Scenario>(`/scenarios/${id}`);

  if (!scenario) {
    return <NotFound id={id} />;
  }

  return <ClientSection scenario={scenario} />;
}
