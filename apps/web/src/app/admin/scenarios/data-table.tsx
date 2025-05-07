"use client";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  RowData,
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
import { useMemo } from "react";
import { Filter } from "./filter";
import { RowActions } from "./row-actions";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "boolean";
  }
}

interface DataTableProperties {
  data: Scenario[];
}

export function DataTable({ data }: DataTableProperties) {
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
        }),
        columnHelper.accessor("plan.dest", {
          id: "plan.dest",
          header: () => <div className="text-center">Arrival</div>,
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          enableColumnFilter: false,
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
          header: () => <div className="text-center">Is valid</div>,
          cell: (info) => (
            <div className="flex justify-center items-center">
              <YesNoIcon value={info.getValue()} />
            </div>
          ),
          meta: {
            filterVariant: "boolean",
          },
        }),
        columnHelper.accessor("canClear", {
          id: "canClear",
          header: () => <div className="text-center">Can clear</div>,
          cell: (info) => (
            <div className="flex justify-center items-center">
              <YesNoIcon value={info.getValue()} />
            </div>
          ),
          meta: {
            filterVariant: "boolean",
          },
        }),
        columnHelper.display({
          id: "actions",
          cell: ({ row }) => <RowActions scenarioId={row.original._id} />,
        }),
      ] as ColumnDef<Scenario, unknown>[],
    [columnHelper],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
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
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : undefined}
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
