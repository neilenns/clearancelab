"use client";

import { CraftSectionSkeleton } from "./craft-section-skeleton";
import { PlanSectionSkeleton } from "./plan-section-skeleton";
import { ScenarioOverviewSkeleton } from "./scenario-overview-skeleton";

export const ScenarioFormSkeleton = () => {
  return (
    <div role="status" className="space-y-4" aria-label="Loading scenario form">
      <ScenarioOverviewSkeleton />
      <PlanSectionSkeleton />
      <CraftSectionSkeleton />
      <span className="sr-only">Loading scenario form...</span>
    </div>
  );
};
