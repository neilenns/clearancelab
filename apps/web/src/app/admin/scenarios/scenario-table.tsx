"use client";

import { Filter } from "@/components/data-table/filters/filter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { useScenarioColumns } from "./use-scenario-columns";

interface DataTableProperties {
  data: Scenario[];
}

export function ScenarioTable({ data }: DataTableProperties) {
  const columns = useScenarioColumns();

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
                  const alignment =
                    header.column.columnDef.meta?.columnHeaderJustification ??
                    "justify-start";

                  return (
                    <TableHead key={header.id} className="font-bold uppercase">
                      {header.isPlaceholder ? undefined : (
                        <div className={cn("flex space-x-2", alignment)}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanFilter() && (
                            <Filter column={header.column} />
                          )}
                        </div>
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
