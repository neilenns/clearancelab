// components/columns.tsx
"use client";

import { YesNoIcon } from "@/components/yes-no-icon";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { RowActions } from "./row-actions";

export function getScenarioColumns(): ColumnDef<Scenario>[] {
  const columnHelper = createColumnHelper<Scenario>();

  return [
    columnHelper.accessor("plan.aid", {
      id: "plan.aid",
      header: () => <div className="uppercase">Callsign</div>,
      cell: (info) => <div>{info.getValue()}</div>,
      minSize: 100,
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("plan.dep", {
      id: "plan.dep",
      header: () => <div className="uppercase">Departure</div>,
      cell: (info) => <div>{info.getValue()}</div>,
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("plan.dest", {
      id: "plan.dest",
      header: () => <div className="uppercase">Arrival</div>,
      cell: (info) => <div>{info.getValue()}</div>,
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("plan.rte", {
      id: "plan.rte",
      header: () => <div className="text-left uppercase">Route</div>,
      cell: (info) => (
        <div className="text-left whitespace-normal">{info.getValue()}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("isValid", {
      id: "isValid",
      header: () => <div className="text-left uppercase">Is valid</div>,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <YesNoIcon value={info.getValue()} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("canClear", {
      id: "canClear",
      header: () => <div className="text-left uppercase">Can clear</div>,
      cell: (info) => (
        <div className="flex justify-center items-center">
          <YesNoIcon value={info.getValue()} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => <RowActions scenarioId={row.original._id} />,
    }),
  ] as ColumnDef<Scenario>[];
}
