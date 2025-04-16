// This layout exists to ensure server-side rendering of the metadata that's created on the fly.
// Solution comes from: https://stackoverflow.com/a/79182354/9206264
// The fetching of data to pass to the page is based off this:
// https://medium.com/@kishorjena/solving-server-to-client-data-flow-in-next-js-handling-index-and-non-index-pages-62d9194537cc
import { ScenarioModel } from "@/models/scenario";
import { Metadata } from "next";
import ClientSection from "./ClientSection";
import { notFound } from "next/navigation";
import NotFound from "./notFound";
import { connectToDatabase } from "@/lib/db";

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

export async function generateStaticParams() {
  connectToDatabase();
  const scenarios = await ScenarioModel.find({});
  return scenarios.map((scenario) => ({ id: scenario.id }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { id } = await params;

  connectToDatabase();
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
