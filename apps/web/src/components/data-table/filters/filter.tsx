import { BooleanFilter } from "@/components/data-table/filters/boolean-filter";
import { SummaryScenario } from "@/db/scenarios";
import { Column } from "@tanstack/react-table";
import { ComboBoxFilter } from "./combo-box-filter";
import { TextFilter } from "./text-filter";

export interface FilterProperties {
  column: Column<SummaryScenario, unknown>;
}

export function Filter({ column }: FilterProperties) {
  const { filterVariant } = column.columnDef.meta ?? {};

  if (filterVariant === "boolean") {
    return <BooleanFilter column={column} />;
  }
  if (filterVariant === "text") {
    return <TextFilter column={column} />;
  }

  if (filterVariant === "combo-box") {
    return <ComboBoxFilter column={column} />;
  }
}
