import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SummaryScenario } from "@/db/scenarios";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

const columnHelper = createColumnHelper<SummaryScenario>();

export function useSidebarColumns() {
  const columns = useMemo<ColumnDef<SummaryScenario, unknown>[]>(
    () =>
      [
        columnHelper.accessor("plan_dep", {
          id: "plan_dep",
          header: () => (
            <Tooltip>
              <TooltipTrigger>
                <div aria-label="Departure column">Dep</div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Departure airport</p>
              </TooltipContent>
            </Tooltip>
          ),
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          meta: {
            columnHeaderJustification: "justify-center",
            width: "w-[100px]",
            filterVariant: "combo-box",
            filterLabel: "departure",
          },
        }),
        columnHelper.accessor("plan_dest", {
          id: "plan_dest",
          header: () => (
            <Tooltip>
              <TooltipTrigger>
                <div aria-label="Arrival column">Dest</div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Destination airport</p>
              </TooltipContent>
            </Tooltip>
          ),
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
          meta: {
            columnHeaderJustification: "justify-center",
            width: "w-[100px]",
            filterVariant: "combo-box",
            filterLabel: "arrival",
          },
        }),
        columnHelper.accessor("plan_aid", {
          id: "plan_aid",
          header: () => (
            <Tooltip>
              <TooltipTrigger>
                <div aria-label="Callsign column">AID</div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Callsign</p>
              </TooltipContent>
            </Tooltip>
          ),
          cell: (info) => <div>{info.getValue()}</div>,
          meta: {
            width: "w-[100px]",
            filterVariant: "text",
            filterLabel: "callsign",
          },
        }),
      ] as ColumnDef<SummaryScenario, unknown>[],
    [],
  );

  return columns;
}
