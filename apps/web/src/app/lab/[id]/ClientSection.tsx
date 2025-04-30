"use client";

import { useRef } from "react";
import FPE from "@/components/fpe/fpe";
import { Answer } from "@/components/answer";
import { Scenario } from "@workspace/validators";

interface ClientSectionProps {
  scenario: Scenario;
}

export default function ClientSection({ scenario }: ClientSectionProps) {
  const fpeRef = useRef<HTMLDivElement>(null);

  return (
    <main className="p-6 overflow-y-auto">
      <FPE scenario={scenario} ref={fpeRef} />
      <Answer scenario={scenario} />
    </main>
  );
}
