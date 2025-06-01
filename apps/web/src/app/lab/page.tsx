import { fetchScenariosByIds } from "@/api/scenarios/fetch-scenarios-by-ids";
import { ENV } from "@/lib/environment";
import { Scenario } from "@workspace/validators";
import { Documentation } from "./documentation";

export default async function Page() {
  let scenario: Scenario | undefined;

  try {
    const scenarios = await fetchScenariosByIds([ENV.SAMPLE_SCENARIO_ID]);
    scenario = scenarios[0] ?? undefined;
  } catch (error) {
    console.error("Failed to fetch sample scenario:", error);
  }

  return (
    <main className="flex h-full flex-col px-6">
      <Documentation sampleScenario={scenario} />
    </main>
  );
}
