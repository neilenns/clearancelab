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
  { label: "All", value: undefined },
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const BooleanFilter = ({ column }: FilterProperties) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const columnFilterValue = column.getFilterValue();

  return (
    <div className="flex items-center justify-center space-x-1">
      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            id={`filter-button-${column.id}`}
            aria-label={`Toggle ${column.columnDef.header} filter`}
            aria-haspopup="menu"
            aria-expanded={isPopoverOpen}
            onClick={() => setPopoverOpen((previous) => !previous)}
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
          role="menu"
          aria-labelledby={`filter-button-${column.id}`}
        >
          {booleanFilterOptions.map((option) => (
            <button
              key={option.label}
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
