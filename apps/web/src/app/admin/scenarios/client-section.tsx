"use client";

import { Scenario } from "@workspace/validators";
import { getScenarioColumns } from "./columns";
import { DataTable } from "./data-table";

interface ClientSectionProperties {
  scenarios: Scenario[];
}

export default function ClientSection({ scenarios }: ClientSectionProperties) {
  return (
    <div aria-label="Scenarios table container">
      <DataTable columns={getScenarioColumns()} data={scenarios} />
    </div>
  );
}
