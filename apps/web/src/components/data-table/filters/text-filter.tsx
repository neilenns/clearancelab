import { DebouncedInput } from "@/components/debounced-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FunnelIcon } from "lucide-react";
import { useState } from "react";
import { FilterProperties } from "./filter";

export const TextFilter = ({ column }: FilterProperties) => {
  const [isOpen, setIsOpen] = useState(false);
  const columnFilterValue = column.getFilterValue();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          id={`filter-button-${column.id}`}
          aria-labelledby={`filter-button-${column.id}`}
          aria-haspopup="dialog"
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
        className="w-[180px] p-2 space-y-1"
        role="dialog"
        aria-labelledby={`filter-button-${column.id}`}
      >
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? "") as string}
          onChange={(value) => column.setFilterValue(value)}
          onKeyDown={handleKeyDown}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          className="border focus-visible:ring-[1px]"
          list={column.id + "list"}
          aria-label={`Filter by ${column.columnDef.header}`}
          role="searchbox"
        />
      </PopoverContent>
    </Popover>
  );
};
