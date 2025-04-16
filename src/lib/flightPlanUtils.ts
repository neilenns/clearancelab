import { FlightPlan } from "@/interfaces/flightPlan";
import flightPlans from "@/data/flightPlans.json" assert { type: "json" };
import { cache } from "react";

export function getAllFlightPlans(): FlightPlan[] {
  return flightPlans.slice().sort((a, b) => {
    // Sort by dep (alphabetically)
    const depCompare = a.dep.localeCompare(b.dep);
    if (depCompare !== 0) return depCompare;

    // Then by dest (alphabetically)
    const destCompare = a.dest.localeCompare(b.dest);
    if (destCompare !== 0) return destCompare;

    // Then by aid (alphabetically)
    return a.aid.localeCompare(b.aid);
  });
}

export const getFlightPlanById = cache((id: string): FlightPlan | undefined => {
  return flightPlans.find((plan) => plan.id === id);
});
