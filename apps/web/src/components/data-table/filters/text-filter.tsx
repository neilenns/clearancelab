import { DebouncedInput } from "@/components/debounced-input";
import { FilterProperties } from "./filter";

export const TextFilter = ({ column }: FilterProperties) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
      className="w-36 border shadow rounded"
      list={column.id + "list"}
    />
  );
};
