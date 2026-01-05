import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FunnelIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { FilterProperties } from "./filter";
import { FilterCommandItem } from "./filter-command-item";

export const ComboBoxFilter = ({ column }: FilterProperties) => {
  const columnFilterValue = column.getFilterValue();
  const [open, setOpen] = useState(false);

  const onSelect = useCallback(
    (value: string | undefined) => {
      // If the value is an empty string (our convention for "All"),
      // set the filter to undefined to clear it.
      if (value === "") {
        column.setFilterValue(undefined);
      } else {
        column.setFilterValue(value);
      }
      setOpen(false);
    },
    [column],
  );

  // Get the faceted unique values from the column
  const facetedValuesMap = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(
    // Use the keys from the facetedValuesMap
    () => [...facetedValuesMap.keys()].toSorted().slice(0, 5000),
    // Depend on the facetedValuesMap instance
    [facetedValuesMap],
  );

  const filterLabel = column.columnDef.meta?.filterLabel;

  return (
    <div className="flex items-center justify-center space-x-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={`filter-button-${column.id}`}
            aria-label={`Filter ${filterLabel}`}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <FunnelIcon
              className={cn(
                "h-4 w-4",
                column.getIsFiltered()
                  ? "text-primary fill-primary"
                  : "text-muted-foreground fill-none",
              )}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-37.5 p-2 space-y-1"
          role="dialog"
          aria-labelledby={`filter-button-${column.id}`}
        >
          <Command>
            <CommandInput />
            <CommandList>
              <CommandEmpty>No {filterLabel} options found.</CommandEmpty>
              <CommandGroup>
                <FilterCommandItem
                  key={"all"}
                  value={""}
                  // If the actual columnFilterValue is undefined, pass "" to this item
                  // so it appears selected. Otherwise, pass the actual filter value.
                  columnFilterValue={
                    columnFilterValue === undefined ? "" : columnFilterValue
                  }
                  onSelect={onSelect}
                >
                  All
                </FilterCommandItem>
                {sortedUniqueValues.map((value) => (
                  <FilterCommandItem
                    key={value}
                    value={value}
                    columnFilterValue={columnFilterValue}
                    onSelect={onSelect}
                  >
                    {value}
                  </FilterCommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
