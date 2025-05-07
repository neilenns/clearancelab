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
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTableSearchParams } from "tanstack-table-search-params";
import { useScenarioColumns } from "./use-scenario-columns";

interface DataTableProperties {
  data: Scenario[];
}

export function ScenarioTable({ data }: DataTableProperties) {
  const router = useRouter();
  const columns = useScenarioColumns();

  // From https://github.com/taro-28/tanstack-table-search-params?tab=readme-ov-file
  // The encoder and decoder is custom and uses JSON because the default method doesn't seem to
  // work with string parameters. The encoder/decoder below comes from
  // https://github.com/taro-28/tanstack-table-search-params/blob/main/examples/next-pages-router/src/pages/custom-encoder-decoder.tsx
  const stateAndOnChanges = useTableSearchParams(
    {
      query: useSearchParams(),
      pathname: usePathname(),
      replace: router.replace,
    },
    {
      encoders: {
        globalFilter: (globalFilter) => ({
          globalFilter: JSON.stringify(globalFilter),
        }),
        columnFilters: (columnFilters) =>
          Object.fromEntries(
            columnFilters.map(({ id, value }) => [
              `columnFilters.${id}`,
              JSON.stringify(value),
            ]),
          ),
      },
      decoders: {
        globalFilter: (query) =>
          query["globalFilter"]
            ? JSON.parse(query["globalFilter"] as string)
            : (query["globalFilter"] ?? ""),
        columnFilters: (query) =>
          Object.entries(query)
            .filter(([key]) => key.startsWith("columnFilters."))
            .map(([key, value]) => ({
              id: key.replace("columnFilters.", ""),
              value: JSON.parse(value as string),
            })),
      },
    },
  );

  const table = useReactTable({
    ...stateAndOnChanges,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
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
                  const width = header.column.columnDef.meta?.width;

                  return (
                    <TableHead
                      key={header.id}
                      className={cn("font-bold uppercase", width)}
                    >
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
