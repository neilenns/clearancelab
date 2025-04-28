"use client";

import { CraftSectionSkeleton } from "./craft-section-skeleton";
import { PlanSectionSkeleton } from "./plan-section-skeleton";
import { ScenarioOverviewSkeleton } from "./scenario-overview-skeleton";

export const ScenarioFormSkeleton = () => {
  return (
    <div className="space-y-4">
      <ScenarioOverviewSkeleton />
      <PlanSectionSkeleton />
      <CraftSectionSkeleton />
    </div>
  );
};
