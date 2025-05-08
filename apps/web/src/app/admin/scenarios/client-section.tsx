"use client";

import { ScenarioSummary } from "@workspace/validators";
import { ScenarioTable } from "./scenario-table";

interface ClientSectionProperties {
  scenarios: ScenarioSummary[];
}

export default function ClientSection({ scenarios }: ClientSectionProperties) {
  return (
    <div aria-label="Scenarios table container">
      <ScenarioTable data={scenarios} />
    </div>
  );
}
