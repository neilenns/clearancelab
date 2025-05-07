import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FunnelIcon } from "lucide-react";
import { FilterProperties } from "./filter";

const booleanFilterOptions = [
  { label: "All", value: undefined },
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const BooleanFilter = ({ column }: FilterProperties) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <div className="flex items-center justify-center space-x-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id={`filter-button-${column.id}`}
            aria-label={`Toggle ${column.columnDef.header} filter`}
            aria-haspopup="menu"
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
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[150px] p-2 space-y-1"
          role="menu"
          aria-labelledby={`filter-button-${column.id}`}
        >
          {booleanFilterOptions.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => {
                column.setFilterValue(option.value);
              }}
              aria-selected={columnFilterValue === option.value}
              className={cn(
                "w-full text-left px-2 py-1 rounded hover:bg-muted",
                columnFilterValue === option.value ? "bg-muted" : "",
              )}
              aria-label={`Set ${column.columnDef.header} filter to ${option.label}`}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
