"use client";

import { AirportConditionsSectionSkeleton } from "./airport-conditions-section-skeleton";
import { CraftSectionSkeleton } from "./craft-section-skeleton";
import { ExplanationsSectionSkeleton } from "./explanations-section-skeleton";
import { PlanSectionSkeleton } from "./plan-section-skeleton";

export const ScenarioFormSkeleton = () => {
  return (
    <div role="status" className="space-y-4" aria-label="Loading scenario form">
      <PlanSectionSkeleton />
      <AirportConditionsSectionSkeleton />
      <ExplanationsSectionSkeleton />
      <CraftSectionSkeleton />
      <span className="sr-only">Loading scenario form...</span>
    </div>
  );
};
