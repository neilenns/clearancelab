import { TooltipProvider } from "@/components/ui/tooltip";
import { formatAirportName } from "@/lib/format";
import { Scenario } from "@workspace/validators";
import * as changeCase from "change-case";
import { CraftElement } from "./craft-element";

interface CraftProperties {
  scenario: Scenario;
}

export function Craft({ scenario }: CraftProperties) {
  const { destAirportInfo, craft } = scenario;
  const clearanceLimit = destAirportInfo?.name ?? craft?.clearanceLimit;
  const departure = craft?.frequency ?? "offline";

  return (
    <TooltipProvider>
      <div role="region" aria-label="Clearance information">
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
            via the <CraftElement element="route">{craft.route}.</CraftElement>
          </span>
        )}{" "}
        {craft?.altitude && (
          <CraftElement element="altitude">{changeCase.sentenceCase(craft.altitude)}.</CraftElement>
        )}{" "}
        <CraftElement element="frequency">Departure is {departure}.</CraftElement>{" "}
        {scenario.plan.bcn && (
          <CraftElement element="transponder">Squawk {scenario.plan.bcn}.</CraftElement>
        )}
      </div>
    </TooltipProvider>
  );
}
