import { ExplanationLevel } from "@workspace/validators";
import { AlertOctagon, AlertTriangle, CheckCircle, Info, Lightbulb } from "lucide-react";
import React, { ReactNode } from "react";
import { Alert, AlertDescription } from "./ui/alert";

interface CalloutBoxProperties {
  level: ExplanationLevel;
  children: ReactNode;
}

const levelIcons: Record<ExplanationLevel, React.ElementType> = {
  info: Info,
  ok: CheckCircle,
  tip: Lightbulb,
  warning: AlertTriangle,
  error: AlertOctagon,
} as const;

export function CalloutBox({ level, children }: CalloutBoxProperties) {
  return (
    <Alert className="mb-2" variant={level} role="alert" aria-live="polite">
      {(() => {
        const Icon = levelIcons[level];
        return <Icon className="h-4 w-4" aria-hidden="true" />;
      })()}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
