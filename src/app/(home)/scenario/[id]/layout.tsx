// This layout exists to ensure server-side rendering of the metadata that's created on the fly.
// Solution comes from: https://stackoverflow.com/a/79182354/9206264
import { ScenarioModel } from "@/models/scenario";
import { Metadata } from "next";
import ClientSection from "./ReExportClientSection";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | undefined> {
  const { id } = await params;
  const scenario = await ScenarioModel.findScenarioById(id);

  if (!scenario) {
    return;
  }

  return {
    title: scenario.plan.aid,
    description: `Scenario for ${scenario.plan.aid}, flying from ${scenario.plan.dep} to ${scenario.plan.dest}`,
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { id } = await params;
  const scenario = await ScenarioModel.findScenarioById(id);

  if (!scenario) {
    notFound();
  }

  return (
    <>
      <ClientSection scenario={scenario} />
    </>
  );
}
