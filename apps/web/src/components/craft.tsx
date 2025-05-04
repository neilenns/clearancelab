import {
  capitalizeFirst,
  getFormattedClearanceLimit,
  getFormattedDepartureFrequency,
  getTelephony,
} from "@workspace/plantools";
import { Scenario } from "@workspace/validators";

interface CraftProperties {
  scenario: Scenario;
}

export function Craft({ scenario }: CraftProperties) {
  const { destAirportInfo, craft } = scenario;
  const clearanceLimit = destAirportInfo?.name ?? craft?.clearanceLimit;

  return (
    <section role="region" aria-label="Clearance information">
      <p className="space-x-1">
        <span key="telephony">{getTelephony(scenario)},</span>
        {clearanceLimit && (
          <>
            <span>cleared to</span>
            <span>{getFormattedClearanceLimit(scenario)}</span>
          </>
        )}
        {craft?.route && <span>via the {craft.route}.</span>}
        {craft?.altitude && <span>{capitalizeFirst(craft.altitude)}.</span>}
        <span>Departure is {getFormattedDepartureFrequency(scenario)}.</span>
        {scenario.plan.bcn && (
          <span>Squawk {scenario.plan.bcn.toString().padStart(4, "0")}.</span>
        )}
      </p>
    </section>
  );
}
