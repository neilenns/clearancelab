import { ProblemLevel } from "@/interfaces/level";
import React, { ReactNode } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Info, CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

interface CalloutBoxProps {
  level: ProblemLevel;
  children: ReactNode;
}

const levelIcons = {
  info: Info,
  ok: CheckCircle,
  warning: AlertTriangle,
  error: AlertOctagon,
} as const;

export function CalloutBox({ level, children }: CalloutBoxProps) {
  return (
    <Alert variant={level}>
      {React.createElement(levelIcons[level], { className: "h-4 w-4" })}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
