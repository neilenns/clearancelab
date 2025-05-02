"use client";

import FPE from "@/components/fpe/fpe";
import { Answer } from "@/components/answer";
import { Scenario } from "@workspace/validators";

interface ClientSectionProperties {
  scenario: Scenario;
}

export default function ClientSection({ scenario }: ClientSectionProperties) {
  return (
    <main className="p-6 overflow-y-auto">
      <FPE scenario={scenario} />
      <Answer scenario={scenario} />
    </main>
  );
}
