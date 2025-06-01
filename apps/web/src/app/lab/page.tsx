import { fetchScenariosByIds } from "@/api/scenarios/fetch-scenarios-by-ids";
import { ENV } from "@/lib/environment";
import { Documentation } from "./documentation";

export default async function Page() {
  const scenarios = await fetchScenariosByIds([ENV.SAMPLE_SCENARIO_ID]);

  const scenario = scenarios[0] ?? undefined;

  return (
    <main className="flex h-full flex-col px-6">
      <Documentation sampleScenario={scenario} />
    </main>
  );
}
