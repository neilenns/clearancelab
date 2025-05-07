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
import { useMemo, useState } from "react";
import { FilterProperties } from "./filter";
import { FilterCommandItem } from "./filter-command-item";

export const ComboBoxFilter = ({ column }: FilterProperties) => {
  const columnFilterValue = column.getFilterValue();
  const [open, setOpen] = useState(false);

  const onSelect = (value: string | undefined) => {
    column.setFilterValue(value);
    setOpen(false);
  };

  const sortedUniqueValues = useMemo(
    () => [...column.getFacetedUniqueValues().keys()].sort().slice(0, 5000),
    [column],
  );

  return (
    <div className="flex items-center justify-center space-x-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={`filter-button-${column.id}`}
            aria-labelledby={`filter-button-${column.id}`}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <FunnelIcon
              className={cn(
                "h-4 w-4",
                columnFilterValue === undefined
                  ? "text-muted-foreground fill-none"
                  : "text-primary fill-primary",
              )}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[150px] p-2 space-y-1"
          role="dialog"
          aria-labelledby={`filter-button-${column.id}`}
        >
          <Command>
            <CommandInput />
            <CommandList>
              <CommandEmpty>No airport found.</CommandEmpty>
              <CommandGroup>
                <FilterCommandItem
                  key={"all"}
                  value={undefined}
                  columnFilterValue={columnFilterValue}
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
