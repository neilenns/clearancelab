import { YesNoIcon } from "@/components/yes-no-icon";
import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { useMemo } from "react";
import { RowActions } from "./row-actions";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "boolean";
    columnHeaderJustification?:
      | "justify-start"
      | "justify-center"
      | "justify-end";
  }
}

export function useScenarioColumns() {
  const columnHelper = createColumnHelper<Scenario>();

  const columns = useMemo<ColumnDef<Scenario, unknown>[]>(
    () =>
      [
        columnHelper.accessor("plan.aid", {
          id: "plan.aid",
          header: () => <div>Callsign</div>,
          cell: (info) => <div>{info.getValue()}</div>,
          enableColumnFilter: false,
        }),
        columnHelper.accessor("plan.dep", {
          id: "plan.dep",
          header: () => <div className="text-center">Departure</div>,
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          enableColumnFilter: false,
          meta: {
            columnHeaderJustification: "justify-center",
          },
        }),
        columnHelper.accessor("plan.dest", {
          id: "plan.dest",
          header: () => <div className="text-center">Arrival</div>,
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          enableColumnFilter: false,
          meta: {
            columnHeaderJustification: "justify-center",
          },
        }),
        columnHelper.accessor("plan.rte", {
          id: "plan.rte",
          header: () => <div className="text-left">Route</div>,
          cell: (info) => (
            <div className="text-left whitespace-normal">{info.getValue()}</div>
          ),
          enableColumnFilter: false,
        }),
        columnHelper.accessor("isValid", {
          id: "isValid",
          header: () => <span>Is valid</span>,
          cell: (info) => (
            <div className="flex justify-center items-center">
              <YesNoIcon value={info.getValue()} />
            </div>
          ),
          meta: {
            filterVariant: "boolean",
            columnHeaderJustification: "justify-center",
          },
        }),
        columnHelper.accessor("canClear", {
          id: "canClear",
          header: () => <span>Can clear</span>,
          cell: (info) => (
            <div className="flex justify-center items-center">
              <YesNoIcon value={info.getValue()} />
            </div>
          ),
          meta: {
            filterVariant: "boolean",
            columnHeaderJustification: "justify-center",
          },
        }),
        columnHelper.display({
          id: "actions",
          cell: ({ row }) => <RowActions scenarioId={row.original._id} />,
        }),
      ] as ColumnDef<Scenario, unknown>[],
    [columnHelper],
  );

  return columns;
}
