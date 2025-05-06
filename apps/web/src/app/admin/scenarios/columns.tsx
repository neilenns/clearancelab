"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { RowActions } from "./row-actions";

const columnHelper = createColumnHelper<Scenario>();

const columns = [
  columnHelper.accessor("plan.dep", {
    id: "plan.dep",
    header: "Departure",
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("plan.dest", {
    id: "plan.dest",
    header: "Arrival",
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("plan.rte", {
    id: "plan.rte",
    header: () => <div className="text-left">Route</div>,
    cell: (info) => (
      <div className="text-left whitespace-normal">{info.getValue()}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const scenario = row.original;
      return (
        <RowActions
          scenarioId={scenario._id}
        />
      );
    },
  }),
] as ColumnDef<Scenario>[];

export const defaultColumns = columns;
