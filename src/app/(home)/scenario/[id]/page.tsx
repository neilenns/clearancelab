"use server";

import { ScenarioModel } from "@/models/scenario";
import ClientSection from "./ClientSection";
import NotFound from "./notFound";

type Params = Promise<{ id: string }>;

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
