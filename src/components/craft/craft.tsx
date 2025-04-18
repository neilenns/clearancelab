import { ScenarioData } from "@/models/scenario";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatAirportName } from "@/lib/format";
import "./craft.css";

const craftLabels = {
  clearanceLimit: "C: Clearance Limit",
  route: "R: Route",
  altitude: "A: Altitude",
  frequency: "F: Frequency",
  transponder: "T: Transponder Code",
};

interface CraftProps {
  scenario: ScenarioData;
}

export function Craft({ scenario }: CraftProps) {
  const { destAirportInfo, craft } = scenario;

  const parts: React.ReactNode[] = [];

  if (craft?.telephony) {
    parts.push(<span key="telephony">{craft.telephony}, </span>);
  }

  if (craft?.clearanceLimit) {
    parts.push(
      <span key="clearanceLimit">
        <Tooltip>
          <TooltipTrigger className="tooltip-trigger">{`cleared to ${formatAirportName(
            destAirportInfo?.name ?? craft.clearanceLimit
          )}`}</TooltipTrigger>
          <TooltipContent>{craftLabels.clearanceLimit}</TooltipContent>
        </Tooltip>
      </span>
    );
  }

  if (craft?.route) {
    parts.push(
      <span key="route">
        {" "}
        via
        <Tooltip>
          <TooltipTrigger className="tooltip-trigger">
            {craft.route}
          </TooltipTrigger>
          <TooltipContent>{craftLabels.route}</TooltipContent>
        </Tooltip>
        .{" "}
      </span>
    );
  }

  if (craft?.altitude) {
    parts.push(
      <span key="altitude">
        <Tooltip>
          <TooltipTrigger className="tooltip-trigger">
            {craft.altitude}
          </TooltipTrigger>
          <TooltipContent>{craftLabels.altitude}</TooltipContent>
        </Tooltip>
        .{" "}
      </span>
    );
  }

  if (craft?.frequency) {
    parts.push(
      <span key="frequency">
        <Tooltip>
          <TooltipTrigger className="tooltip-trigger">
            Departure is {craft.frequency}
          </TooltipTrigger>
          <TooltipContent>{craftLabels.frequency}</TooltipContent>
        </Tooltip>
        .{" "}
      </span>
    );
  }

  if (craft?.transponder) {
    parts.push(
      <span key="transponder">
        <Tooltip>
          <TooltipTrigger className="tooltip-trigger">
            Squawk {craft.transponder}.
          </TooltipTrigger>
          <TooltipContent>{craftLabels.transponder}</TooltipContent>
        </Tooltip>
      </span>
    );
  }

  return (
    <TooltipProvider>
      <p className="leading-relaxed">{parts}</p>
    </TooltipProvider>
  );
}
