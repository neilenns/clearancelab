"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { YesNoIcon } from "@/components/yes-no-icon";
import { Scenario } from "@workspace/validators";
import { RowActions } from "./row-actions";

interface DataTableProperties {
  data: Scenario[];
}

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

export function DataTable({ data }: DataTableProperties) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full space-y-2">
      <div className="w-full overflow-hidden rounded-md border">
        <Table aria-label="Scenarios data table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold uppercase">
                      {header.isPlaceholder
                        ? undefined
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  aria-selected={row.getIsSelected()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow aria-live="polite">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                  role="status"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
