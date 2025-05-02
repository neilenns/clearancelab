"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { craftLabels } from "@/interfaces/craft-labels";
import { ReactNode } from "react";

interface CraftElementProperties {
  element: keyof typeof craftLabels;
  children: ReactNode;
}

export function CraftElement({ element, children }: CraftElementProperties) {
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
