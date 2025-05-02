"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  children?: React.ReactNode;
}

export function ReactFormSwitch({ field, children }: FormSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch checked={field.value} onCheckedChange={field.onChange} aria-label={field.name} />
      {children && <Label htmlFor={field.name}>{children}</Label>}
      <input type="hidden" name={field.name} value={field.value ? "true" : "false"} />
    </div>
  );
}
