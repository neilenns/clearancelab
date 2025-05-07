import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...properties
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <Input
      {...properties}
      aria-label={properties.placeholder || "Text input"}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
