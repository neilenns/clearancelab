import scenarios from "@/data/scenarios.json" assert { type: "json" };
import Scenario from "@/interfaces/scenario";
import { cache } from "react";

export const getAllScenarios = cache((): Scenario[] => {
  return scenarios.slice().sort((a, b) => {
    // Sort by dep (alphabetically)
    const depCompare = a.plan.dep.localeCompare(b.plan.dep);
    if (depCompare !== 0) return depCompare;

    // Then by dest (alphabetically)
    const destCompare = a.plan.dest.localeCompare(b.plan.dest);
    if (destCompare !== 0) return destCompare;

    // Then by aid (alphabetically)
    return a.plan.aid.localeCompare(b.plan.aid);
  });
});

export const getScenarioById = cache((id: string): Scenario | undefined => {
  return scenarios.find((scenario) => scenario.id === id);
});
