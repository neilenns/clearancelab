import { cn } from "@/lib/utils";
import { ExplanationLevel } from "@workspace/validators";
import { cva, VariantProps } from "class-variance-authority";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
} from "lucide-react";
import React from "react";
import { AlertDescription } from "./ui/alert";

const calloutBoxVariants = cva(
  "relative w-full border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        error: "[&>svg]:text-[var(--color-alert-error)]",
        info: "[&>svg]:text-[var(--color-alert-info)]",
        ok: "[&>svg]:text-[var(--color-alert-ok)]",
        tip: "[&>svg]:text-[var(--color-alert-tip)]",
        warning: "[&>svg]:text-[var(--color-alert-warning)]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

const levelIcons: Record<ExplanationLevel, React.ElementType> = {
  info: Info,
  ok: CheckCircle,
  tip: Lightbulb,
  warning: AlertTriangle,
  error: AlertOctagon,
} as const;

export function CalloutBox({
  className,
  variant = "info",
  children,
  ...properties
}: React.ComponentProps<"div"> &
  Required<VariantProps<typeof calloutBoxVariants>>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(calloutBoxVariants({ variant }), className)}
      {...properties}
    >
      <div
        className={cn("absolute left-0 top-0 bottom-0 w-1", {
          "bg-[var(--color-alert-error)]": variant === "error",
          "bg-[var(--color-alert-info)]": variant === "info",
          "bg-[var(--color-alert-ok)]": variant === "ok",
          "bg-[var(--color-alert-warning)]": variant === "warning",
        })}
      />
      {(() => {
        const Icon = levelIcons[variant as ExplanationLevel];
        return <Icon className="h-4 w-4" aria-hidden="true" />;
      })()}
      <AlertDescription>{children}</AlertDescription>
    </div>
  );
}
