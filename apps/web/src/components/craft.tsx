import { TooltipProvider } from "@/components/ui/tooltip";
import {
  capitalizeFirst,
  getFormattedClearanceLimit,
} from "@workspace/plantools";
import { Scenario } from "@workspace/validators";

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
        {craft?.telephony && <span key="telephony">{craft.telephony},</span>}
        &nbsp;
        {clearanceLimit && (
          <span>
            cleared to&nbsp;
            {getFormattedClearanceLimit(scenario)}&nbsp;
          </span>
        )}
        {craft?.route && <span>via the {craft.route}.</span>}&nbsp;
        {craft?.altitude && <span>{capitalizeFirst(craft.altitude)}.</span>}
        &nbsp; Departure is {departure}.&nbsp;
        {scenario.plan.bcn && <span>Squawk {scenario.plan.bcn}.</span>}
      </div>
    </TooltipProvider>
  );
}
