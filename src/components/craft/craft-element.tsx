"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import "./craft-element.css";
import { craftLabels } from "@/interfaces/craftLabels";

interface CraftElementProps {
  element: keyof typeof craftLabels;
  children: ReactNode;
}

export function CraftElement({ element, children }: CraftElementProps) {
  return (
    <span>
      <Tooltip>
        <TooltipTrigger
          className="tooltip-trigger"
          aria-label={craftLabels.clearanceLimit}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>{craftLabels[element]}</TooltipContent>
      </Tooltip>
    </span>
  );
}
