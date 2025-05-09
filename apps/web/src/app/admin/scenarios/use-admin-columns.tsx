import { YesNoIcon } from "@/components/yes-no-icon";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { useMemo } from "react";
import { RowActions } from "./row-actions";

const columnHelper = createColumnHelper<Scenario>();

export function useAdminColumns() {
  const columns = useMemo<ColumnDef<Scenario, unknown>[]>(
    () =>
      [
        columnHelper.accessor("plan.aid", {
          id: "plan.aid",
          header: () => <div aria-label="Callsign column">Callsign</div>,
          cell: (info) => <div>{info.getValue()}</div>,
          meta: {
            width: "w-[100px]",
            filterVariant: "text",
            filterLabel: "callsign",
          },
        }),
        columnHelper.accessor("plan.dep", {
          id: "plan.dep",
          header: () => <div aria-label="Departure column">Departure</div>,
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
          header: () => <div aria-label="Arrival column">Arrival</div>,
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          meta: {
            columnHeaderJustification: "justify-center",
            width: "w-[100px]",
            filterVariant: "combo-box",
            filterLabel: "arrival",
          },
        }),
        columnHelper.accessor("plan.rte", {
          id: "plan.rte",
          header: () => <div aria-label="Route column">Route</div>,
          cell: (info) => (
            <div className="text-left whitespace-normal">{info.getValue()}</div>
          ),
          enableColumnFilter: false,
        }),
        columnHelper.accessor("isValid", {
          id: "isValid",
          header: () => <span aria-label="Is valid column">Is valid</span>,
          cell: (info) => (
            <div className="flex justify-center items-center">
              <YesNoIcon value={info.getValue()} />
            </div>
          ),
          meta: {
            filterVariant: "boolean",
            columnHeaderJustification: "justify-center",
            width: "w-[100px]",
            filterLabel: "is valid",
          },
        }),
        columnHelper.accessor("canClear", {
          id: "canClear",
          header: () => <span aria-label="Can clear column">Can clear</span>,
          cell: (info) => (
            <div className="flex justify-center items-center">
              <YesNoIcon value={info.getValue()} />
            </div>
          ),
          meta: {
            filterVariant: "boolean",
            columnHeaderJustification: "justify-center",
            width: "w-[120px]",
            filterLabel: "can clear",
          },
        }),
        columnHelper.display({
          id: "actions",
          cell: ({ row }) => <RowActions scenarioId={row.original._id} />,
          meta: {
            width: "w-[88px]",
          },
        }),
      ] as ColumnDef<Scenario, unknown>[],
    [],
  );

  return columns;
}
