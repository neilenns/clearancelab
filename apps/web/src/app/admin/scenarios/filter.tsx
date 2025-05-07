import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { Scenario } from "@workspace/validators";
import { FunnelIcon } from "lucide-react";

const booleanFilterOptions = [
  { label: "All", value: "" },
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export function Filter({ column }: { column: Column<Scenario, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();

  if (filterVariant === "boolean") {
    return (
      <div className="flex items-center justify-center space-x-1">
        <Popover>
          <PopoverTrigger asChild>
            <button>
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
          <PopoverContent className="w-[150px] p-2 space-y-1" role="dialog">
            {booleanFilterOptions.map((option) => (
              <button
                key={option.value.toString()}
                role="menuitem"
                onClick={() => {
                  column.setFilterValue(option.value);
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
  }
}
