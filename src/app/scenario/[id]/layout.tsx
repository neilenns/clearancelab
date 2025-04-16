// This layout exists to ensure server-side rendering of the metadata that's created on the fly.
// Solution comes from: https://stackoverflow.com/a/79182354/9206264
import { getScenarioById } from "@/lib/scenarioUtils";

export function generateMetadata({ params }: { params: { id: string } }) {
  const selectedId = params.id;
  const scenario = getScenarioById(selectedId);

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
