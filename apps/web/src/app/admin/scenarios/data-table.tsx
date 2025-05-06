"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFiltersFromUrl } from "@/hooks/use-filters-from-url";
import { Scenario } from "@workspace/validators";
import { useScenarioColumns } from "./columns";

interface DataTableProperties {
  data: Scenario[];
}

export function DataTable({ data }: DataTableProperties) {
  const {
    columnFilters,
    setColumnFilters,
    updateFilter,
    filterValues,
    isReady,
  } = useFiltersFromUrl(["isValid", "canClear"]);
  const columns = useScenarioColumns({ filterValues, updateFilter });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
  });

  if (!isReady)
    return (
      <div aria-busy="true">
        <Spinner size="medium">
          <span>Loading scenarios...</span>
        </Spinner>
      </div>
    );

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
