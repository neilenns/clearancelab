"use client";

import { incrementViews } from "@/api/scenarios/increment-views";
import { Answer } from "@/components/answer";
import FPE from "@/components/fpe/fpe";
import { LabHeader } from "@/components/lab-header";
import { Scenario } from "@workspace/validators";
import { useEffect } from "react";

interface ClientSectionProperties {
  scenario: Scenario;
}

export default function ClientSection({ scenario }: ClientSectionProperties) {
  useEffect(() => {
    void incrementViews(scenario._id);
  }, [scenario._id]);

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
