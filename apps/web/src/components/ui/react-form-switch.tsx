"use client";

import { Switch } from "@/components/ui/switch";
import { ControllerRenderProps } from "react-hook-form";

interface FormSwitchProps {
  field: ControllerRenderProps<any, any>;
}

export function ReactFormSwitch({ field }: FormSwitchProps) {
  return (
    <div>
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-label={field.name}
      />
      <input
        type="hidden"
        name={field.name}
        value={field.value ? "true" : "false"}
      />
    </div>
  );
}
