"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { RowActions } from "./row-actions";

const columnHelper = createColumnHelper<Scenario>();

const columns = [
  columnHelper.accessor("plan.aid", {
    id: "plan.aid",
    header: () => (
      <div aria-sort="none" className="uppercase">
        Callsign
      </div>
    ),
    cell: (info) => <div>{info.getValue()}</div>,
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("plan.dep", {
    id: "plan.dep",
    header: () => (
      <div aria-sort="none" className="uppercase">
        Departure
      </div>
    ),
    cell: (info) => <div>{info.getValue()}</div>,
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("plan.dest", {
    id: "plan.dest",
    header: () => (
      <div aria-sort="none" className="uppercase">
        Arrival
      </div>
    ),
    cell: (info) => <div>{info.getValue()}</div>,
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("plan.rte", {
    id: "plan.rte",
    header: () => (
      <div className="text-left uppercase" aria-sort="none">
        Route
      </div>
    ),
    cell: (info) => (
      <div className="text-left whitespace-normal">{info.getValue()}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const scenario = row.original;
      return <RowActions scenarioId={scenario._id} />;
    },
  }),
] as ColumnDef<Scenario>[];

export const defaultColumns = columns;
