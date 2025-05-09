import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ScenarioSummary } from "@workspace/validators";
import { useMemo } from "react";

const columnHelper = createColumnHelper<ScenarioSummary>();

export function useSidebarColumns() {
  const columns = useMemo<ColumnDef<ScenarioSummary, unknown>[]>(
    () =>
      [
        columnHelper.accessor("plan.dep", {
          id: "plan.dep",
          header: () => <div aria-label="Departure column">Dep</div>,
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          meta: {
            columnHeaderJustification: "justify-center",
            width: "w-[100px]",
            filterVariant: "combo-box",
            filterLabel: "departure",
          },
        }),
        columnHelper.accessor("plan.dest", {
          id: "plan.dest",
          header: () => <div aria-label="Arrival column">Dest</div>,
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          meta: {
            columnHeaderJustification: "justify-center",
            width: "w-[100px]",
            filterVariant: "combo-box",
            filterLabel: "arrival",
          },
        }),
        columnHelper.accessor("plan.aid", {
          id: "plan.aid",
          header: () => <div aria-label="Callsign column">AID</div>,
          cell: (info) => <div>{info.getValue()}</div>,
          meta: {
            width: "w-[100px]",
            filterVariant: "text",
            filterLabel: "callsign",
          },
        }),
      ] as ColumnDef<ScenarioSummary, unknown>[],
    [],
  );

  return columns;
}
