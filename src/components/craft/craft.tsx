import { ScenarioData } from "@/models/scenario";
import { TooltipProvider } from "@/components/ui/tooltip";
import { formatAirportName } from "@/lib/format";
import { CraftElement } from "./craft-element";

interface CraftProps {
  scenario: ScenarioData;
}

export function Craft({ scenario }: CraftProps) {
  const { destAirportInfo, craft } = scenario;

  return (
    <TooltipProvider>
      {craft?.telephony && <span key="telephony">{craft.telephony},</span>}{" "}
      {craft?.clearanceLimit && (
        <CraftElement element="clearanceLimit">
          {`cleared to ${formatAirportName(
            destAirportInfo?.name ?? craft.clearanceLimit
          )}`}
        </CraftElement>
      )}
      {craft?.route && (
        <CraftElement element="route">via {craft.route}.</CraftElement>
      )}{" "}
      {craft?.altitude && (
        <CraftElement element="altitude">{craft.altitude}.</CraftElement>
      )}{" "}
      {craft?.frequency && (
        <CraftElement key="frequency" element="frequency">
          Departure is {craft.frequency}.
        </CraftElement>
      )}{" "}
      {craft?.transponder && (
        <CraftElement key="transponder" element="transponder">
          Squawk {craft.transponder}.
        </CraftElement>
      )}
    </TooltipProvider>
  );
}
