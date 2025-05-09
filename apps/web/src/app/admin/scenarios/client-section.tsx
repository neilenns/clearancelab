"use client";

import { ScenarioSummary } from "@workspace/validators";
import { ScenarioTable } from "../../../components/scenario-table";
import { useAdminColumns } from "./use-admin-columns";

interface ClientSectionProperties {
  scenarios: ScenarioSummary[];
}

export default function ClientSection({ scenarios }: ClientSectionProperties) {
  const columns = useAdminColumns();

  return (
    <div aria-label="Scenarios table container">
      <ScenarioTable data={scenarios} columns={columns} />
    </div>
  );
}
