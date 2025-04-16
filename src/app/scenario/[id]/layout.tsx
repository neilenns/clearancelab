// This layout exists to ensure server-side rendering of the metadata that's created on the fly.
// Solution comes from: https://stackoverflow.com/a/79182354/9206264
import { getScenarioById } from "@/lib/scenarioUtils";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { id } = await params;
  const scenario = getScenarioById(id);

  if (!scenario) {
    return;
  }

  return {
    title: scenario.plan.aid,
    description: `Scenario for ${scenario.plan.aid}, flying from ${scenario.plan.dep} to ${scenario.plan.dest}`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
