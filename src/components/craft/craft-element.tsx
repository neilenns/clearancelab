"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { craftLabels } from "@/interfaces/craftLabels";

interface CraftElementProps {
  element: keyof typeof craftLabels;
  children: ReactNode;
}

export function CraftElement({ element, children }: CraftElementProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className="border-b border-dotted border-[var(--muted-foreground)] pb-0"
        aria-label={craftLabels.clearanceLimit}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{craftLabels[element]}</TooltipContent>
    </Tooltip>
  );
}
