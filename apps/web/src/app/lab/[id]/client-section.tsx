"use client";

import { Answer } from "@/components/answer";
import FPE from "@/components/fpe/fpe";
import { LabHeader } from "@/components/lab-header";
import { Scenario } from "@workspace/validators";

interface ClientSectionProperties {
  scenario: Scenario;
}

export default function ClientSection({ scenario }: ClientSectionProperties) {
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
