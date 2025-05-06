"use client";

import type { ColumnFilter } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useBooleanFiltersFromUrl<T extends string>(filterKeys: T[]) {
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [filterValues, setFilterValues] = useState<Record<T, string>>(
    {} as Record<T, string>,
  );
  const [isReady, setIsReady] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const filters: ColumnFilter[] = [];
    const values = {} as Record<T, string>;

    for (const key of filterKeys) {
      const value = searchParams.get(key) ?? "all";
      values[key] = value;
      if (value !== "all") {
        filters.push({ id: key, value });
      }
    }

    setColumnFilters(filters);
    setFilterValues(values);
    setIsReady(true);
  }, [filterKeys.join(",")]); // safe enough since it's static

  function updateFilter(id: T, rawValue: string) {
    const value = rawValue === "all" ? undefined : rawValue;

    const params = new URLSearchParams(searchParams.toString());
    if (value === undefined) {
      params.delete(id);
    } else {
      params.set(id, value);
    }

    router.replace(`?${params.toString()}`);
    setFilterValues((prev) => ({ ...prev, [id]: rawValue }));

    setColumnFilters((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      return value ? [...updated, { id, value }] : updated;
    });
  }

  return {
    columnFilters,
    setColumnFilters,
    updateFilter,
    filterValues,
    isReady,
  };
}
