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
    <section role="region" aria-label="Clearance information">
      <p className="space-x-1">
        {craft?.telephony && <span key="telephony">{craft.telephony},</span>}
        {clearanceLimit && (
          <>
            <span>cleared to</span>
            <span>{getFormattedClearanceLimit(scenario)}</span>
          </>
        )}
        {craft?.route && <span>via the {craft.route}.</span>}
        {craft?.altitude && <span>{capitalizeFirst(craft.altitude)}.</span>}
        <span>Departure is {departure}.</span>
        {scenario.plan.bcn && <span>Squawk {scenario.plan.bcn}.</span>}
      </p>
    </section>
  );
}
