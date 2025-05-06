"use client";

import { Scenario } from "@workspace/validators";
import { DataTable } from "./data-table";

interface ClientSectionProperties {
  scenarios: Scenario[];
}

export default function ClientSection({ scenarios }: ClientSectionProperties) {
  return (
    <div aria-label="Scenarios table container">
      <DataTable data={scenarios} />
    </div>
  );
}
