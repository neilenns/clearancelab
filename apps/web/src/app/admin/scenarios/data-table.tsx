"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface DataTableProperties<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProperties<TData, TValue>) {
  const {
    columnFilters,
    setColumnFilters,
    updateFilter,
    filterValues,
    isReady,
  } = useFiltersFromUrl(["isValid", "canClear"]);

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
      <Spinner size="medium">
        <span>Loading scenarios...</span>
      </Spinner>
    );

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-row justify-end space-x-2">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="filter-can-clear"
            className="text-sm font-medium text-muted-foreground"
          >
            Is valid
          </label>
          <Select
            value={filterValues.isValid}
            onValueChange={(value) => {
              updateFilter("isValid", value);

              table
                .getColumn("isValid")
                ?.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger aria-label="Filter is valid column" className="w-30">
              <SelectValue placeholder="Filter is valid" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="filter-can-clear"
            className="text-sm font-medium text-muted-foreground"
          >
            Can clear
          </label>
          <Select
            value={filterValues.canClear}
            onValueChange={(value) => {
              updateFilter("canClear", value);

              table
                .getColumn("canClear")
                ?.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger
              aria-label="Filter can clear column"
              className="w-30"
            >
              <SelectValue placeholder="Filter can clear" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
