"use client";

import { YesNoIcon } from "@/components/yes-no-icon";
import { createColumnHelper } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { RowActions } from "./row-actions";

const columnHelper = createColumnHelper<Scenario>();

export const columns = [
  columnHelper.accessor("plan.aid", {
    id: "plan.aid",
    header: () => <div>Callsign</div>,
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("plan.dep", {
    id: "plan.dep",
    header: () => <div className="text-center">Departure</div>,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor("plan.dest", {
    id: "plan.dest",
    header: () => <div className="text-center">Arrival</div>,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor("plan.rte", {
    id: "plan.rte",
    header: () => <div className="text-left">Route</div>,
    cell: (info) => (
      <div className="text-left whitespace-normal">{info.getValue()}</div>
    ),
  }),
  columnHelper.accessor("isValid", {
    id: "isValid",
    header: () => <div className="text-center">Is valid</div>,
    cell: (info) => (
      <div className="flex justify-center items-center">
        <YesNoIcon value={info.getValue()} />
      </div>
    ),
  }),
  columnHelper.accessor("canClear", {
    id: "canClear",
    header: () => <div className="text-center">Can clear</div>,
    cell: (info) => (
      <div className="flex justify-center items-center">
        <YesNoIcon value={info.getValue()} />
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <RowActions scenarioId={row.original._id} />,
  }),
];
