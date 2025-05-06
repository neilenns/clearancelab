"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { YesNoIcon } from "@/components/yes-no-icon";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { FunnelIcon } from "lucide-react";
import { RowActions } from "./row-actions";

function ColumnFilter<T extends "isValid" | "canClear">({
  label,
  columnKey,
  currentValue,
  update,
}: {
  label: string;
  columnKey: T;
  currentValue: string | undefined;
  update: (key: T, value: string) => void;
}) {
  const options = [
    { label: "All", value: "all" },
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  return (
    <div className="flex items-center justify-center space-x-1">
      <span>{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <button aria-label={`Filter ${label.toLowerCase()}`}>
            <FunnelIcon className="h-4 w-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-2 space-y-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => update(columnKey, option.value)}
              className={`w-full text-left px-2 py-1 rounded hover:bg-muted ${
                currentValue === option.value ? "bg-muted" : ""
              }`}
              aria-label={`Set ${label} filter to ${option.label}`}
            >
              {option.label}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function useScenarioColumns({
  filterValues,
  updateFilter,
}: {
  filterValues: Record<"isValid" | "canClear", string>;
  updateFilter: (key: "isValid" | "canClear", value: string) => void;
}): ColumnDef<Scenario>[] {
  const columnHelper = createColumnHelper<Scenario>();

  return [
    columnHelper.accessor("plan.aid", {
      id: "plan.aid",
      header: () => <div>Callsign</div>,
      cell: (info) => <div>{info.getValue()}</div>,
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("plan.dep", {
      id: "plan.dep",
      header: () => <div className="text-center">Departure</div>,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("plan.dest", {
      id: "plan.dest",
      header: () => <div className="text-center">Arrival</div>,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("plan.rte", {
      id: "plan.rte",
      header: () => <div className="text-left">Route</div>,
      cell: (info) => (
        <div className="text-left whitespace-normal">{info.getValue()}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("isValid", {
      id: "isValid",
      header: () => (
        <ColumnFilter
          label="Is valid"
          columnKey="isValid"
          currentValue={filterValues.isValid}
          update={updateFilter}
        />
      ),
      cell: (info) => (
        <div className="flex justify-center items-center">
          <YesNoIcon value={info.getValue()} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        if (filterValue === undefined || filterValue === "all") return true;
        return row.getValue(columnId) === (filterValue === "true");
      },
    }),
    columnHelper.accessor("canClear", {
      id: "canClear",
      header: () => (
        <ColumnFilter
          label="Can clear"
          columnKey="canClear"
          currentValue={filterValues.canClear}
          update={updateFilter}
        />
      ),
      cell: (info) => (
        <div className="flex justify-center items-center">
          <YesNoIcon value={info.getValue()} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        if (filterValue === undefined || filterValue === "all") return true;
        return row.getValue(columnId) === (filterValue === "true");
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => <RowActions scenarioId={row.original._id} />,
    }),
  ] as ColumnDef<Scenario>[];
}
