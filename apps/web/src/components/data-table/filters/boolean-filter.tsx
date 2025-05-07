import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FunnelIcon } from "lucide-react";
import { useState } from "react";
import { FilterProperties } from "./filter";

const booleanFilterOptions = [
  { label: "All", value: "" },
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const BooleanFilter = ({ column }: FilterProperties) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  // Handle no filter value being selected, which is "undefined" but not something that
  // can be put as a value for a filter. This allows comparing the filter value to
  // the empty string for "All" to set highlighting appropriately.
  const columnFilterValue = column.getFilterValue() ?? "";

  return (
    <div className="flex items-center justify-center space-x-1">
      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button onClick={() => setPopoverOpen((previous) => !previous)}>
            <FunnelIcon
              className={cn(
                "h-4 w-4",
                columnFilterValue === ""
                  ? "text-muted-foreground fill-none"
                  : "text-primary fill-primary",
              )}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-2 space-y-1" role="dialog">
          {booleanFilterOptions.map((option) => (
            <button
              key={option.value.toString()}
              role="menuitem"
              onClick={() => {
                column.setFilterValue(option.value);
                setPopoverOpen(false); // Close the popover
              }}
              aria-selected={columnFilterValue === option.value}
              className={`w-full text-left px-2 py-1 rounded hover:bg-muted ${
                columnFilterValue === option.value ? "bg-muted" : ""
              }`}
              aria-label={`Set ${column.columnDef.header} filter to ${option.label}`}
            >
              {option.label}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
