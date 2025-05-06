"use client";

import type { ColumnFilter } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FILTER_KEYS = ["isValid", "canClear"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

type FilterValues = {
  [K in FilterKey]: string;
};

export function useColumnFiltersFromUrl() {
  const [isReady, setIsReady] = useState(false);

  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    isValid: "all",
    canClear: "all",
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  // Load from URL on first render
  useEffect(() => {
    const filters: ColumnFilter[] = [];
    const values: Partial<FilterValues> = {};

    for (const key of FILTER_KEYS) {
      const value = searchParams.get(key);
      values[key] = value ?? "all";

      if (value && value !== "all") {
        filters.push({ id: key, value });
      }
    }

    setColumnFilters(filters);
    setFilterValues((prev) => ({ ...prev, ...values }));
    setIsReady(true);
  }, []);

  // Update both URL and state
  function updateFilter(id: FilterKey, rawValue: string) {
    const value = rawValue === "all" ? undefined : rawValue;

    const params = new URLSearchParams(searchParams.toString());

    if (value === undefined) {
      params.delete(id);
    } else {
      params.set(id, value);
    }

    router.replace(`?${params.toString()}`);

    // Update filter values
    setFilterValues((prev) => ({ ...prev, [id]: rawValue }));

    // Update table filters
    setColumnFilters((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      return value ? [...updated, { id, value }] : updated;
    });
  }

  return {
    columnFilters,
    setColumnFilters,
    filterValues,
    updateFilter,
    isReady,
  };
}
