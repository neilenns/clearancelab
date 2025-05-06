import { Scenario } from "@workspace/validators";
import { defaultColumns } from "./columns";
import { DataTable } from "./data-table";

interface ClientSectionProperties {
  scenarios: Scenario[];
}

export default function ClientSection({ scenarios }: ClientSectionProperties) {
  return (
    <div>
      <DataTable columns={defaultColumns} data={scenarios} />
    </div>
  );
}
