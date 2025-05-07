import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface FilterCommandItemProperties {
  value: string | undefined;
  columnFilterValue: unknown;
  onSelect: (value: string | undefined) => void;
  children?: React.ReactNode;
}

export const FilterCommandItem = ({
  value,
  children,
  columnFilterValue,
  onSelect,
}: FilterCommandItemProperties) => {
  return (
    <CommandItem
      value={value}
      onSelect={onSelect}
      aria-selected={columnFilterValue === value}
      className={cn(
        "w-full text-left px-2 py-1 rounded hover:bg-muted",
        columnFilterValue === value ? "bg-muted" : "",
      )}
    >
      {children}
    </CommandItem>
  );
};
