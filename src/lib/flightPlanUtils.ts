import { FlightPlan } from "@/interfaces/flightPlan";
import { names } from "./names";
import flightPlans from "@/data/flightPlans.json" assert { type: "json" };

export function getAllFlightPlans(): FlightPlan[] {
  return flightPlans;
}

export function getFlightPlanById(id: number): FlightPlan | undefined {
  return flightPlans.find((plan) => plan.id === id);
}

/**
 * Generates a random beacon code that's in one of the valid ranges for ZSE aircraft.
 * @returns A random beacon code.
 */
function getRandomBCN(): number {
  const ranges = [
    [650, 677],
    [2236, 2277],
    [3430, 3477],
    [7412, 7477],
  ];

  const [min, max] = ranges[Math.floor(Math.random() * ranges.length)];
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value;
}

/**
 * Normalizes the flight plan by assigning default values if they are not provided.
 * @param plan The flight plan to normalize.
 * @returns The normalized flight plan.
 */
export function normalizeFlightPlan(plan?: FlightPlan): FlightPlan | null {
  if (!plan) {
    return null;
  }

  plan.pilotName ??= names[Math.floor(Math.random() * names.length)];
  plan.spd ??=
    Math.round(Math.floor(Math.random() * (450 - 80 + 1) + 80) / 5) * 5; // Speed is always in increments of 5 kts.
  plan.bcn ??= getRandomBCN();
  plan.cid ??= Math.floor(Math.random() * (1950000 - 800000 + 1)) + 800000;

  return plan;
}
