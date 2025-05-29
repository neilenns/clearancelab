"use client";

import { incrementViews } from "@/api/scenarios/increment-views";
import { Answer } from "@/components/answer";
import FPE from "@/components/fpe/fpe";
import { LabHeader } from "@/components/lab-header";
import { Scenario } from "@/db/scenarios";
import { useEffect } from "react";

interface ClientSectionProperties {
  scenario: Scenario;
}

export default function ClientSection({ scenario }: ClientSectionProperties) {
  useEffect(() => {
    if (!scenario) {
      return;
    }

    incrementViews(scenario.id.toString()).catch((error) => {
      console.error("Failed to increment views:", error);
    });
  }, [scenario, scenario.id]);

  return (
    <main className="overflow-y-auto">
      <LabHeader scenario={scenario} />
      <div className="p-4">
        <FPE scenario={scenario} />
        <Answer scenario={scenario} />
      </div>
    </main>
  );
}
