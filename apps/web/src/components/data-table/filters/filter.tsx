import { BooleanFilter } from "@/components/data-table/filters/boolean-filter";
import { Column } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { ComboBoxFilter } from "./combo-box-filter";
import { TextFilter } from "./text-filter";

export interface FilterProperties {
  column: Column<Scenario, unknown>;
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
