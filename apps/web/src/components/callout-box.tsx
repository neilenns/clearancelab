import React, { ReactNode } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Info, CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";
import { ExplanationLevel } from "@workspace/validators";

interface CalloutBoxProps {
  level: ExplanationLevel;
  children: ReactNode;
}

const levelIcons: Record<ExplanationLevel, React.ElementType> = {
  info: Info,
  ok: CheckCircle,
  tip: CheckCircle,
  warning: AlertTriangle,
  error: AlertOctagon,
} as const;

export function CalloutBox({ level, children }: CalloutBoxProps) {
  return (
    <Alert className="mb-2" variant={level}>
      {(() => {
        const Icon = levelIcons[level];
        return <Icon className="h-4 w-4" />;
      })()}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
