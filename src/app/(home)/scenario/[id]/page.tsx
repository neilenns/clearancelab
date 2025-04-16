"use server";

import { ScenarioModel } from "@/models/scenario";
import ClientSection from "./ClientSection";
import NotFound from "./notFound";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const scenarios = await ScenarioModel.findAll();
  return scenarios?.map((scenario) => ({ id: scenario._id })) ?? [];
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const scenario = await ScenarioModel.findScenarioById(id);

  if (!scenario) {
    return <NotFound id={id} />;
  }

  return (
    <>
      <ClientSection scenario={scenario} />
    </>
  );
}
