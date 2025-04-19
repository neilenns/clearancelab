import { ScenarioData } from "@/models/scenario";
import { TooltipProvider } from "@/components/ui/tooltip";
import { formatAirportName } from "@/lib/format";
import { CraftElement } from "./craft-element";

interface CraftProps {
  scenario: ScenarioData;
}

export function Craft({ scenario }: CraftProps) {
  const { destAirportInfo, craft } = scenario;
  const clearanceLimit = destAirportInfo?.name ?? craft?.clearanceLimit;
  const departure = craft?.frequency ?? "offline";

  return (
    <TooltipProvider>
      {craft?.telephony && <span key="telephony">{craft.telephony},</span>}{" "}
      {clearanceLimit && (
        <span>
          cleared to{" "}
          <CraftElement element="clearanceLimit">
            {formatAirportName(clearanceLimit)}
          </CraftElement>{" "}
        </span>
      )}
      {craft?.route && (
        <span>
          via <CraftElement element="route">{craft.route}.</CraftElement>
        </span>
      )}{" "}
      {craft?.altitude && (
        <CraftElement element="altitude">{craft.altitude}.</CraftElement>
      )}{" "}
      <CraftElement element="frequency">Departure is {departure}.</CraftElement>{" "}
      {craft?.transponder && (
        <CraftElement element="transponder">
          Squawk {craft.transponder}.
        </CraftElement>
      )}
    </TooltipProvider>
  );
}
