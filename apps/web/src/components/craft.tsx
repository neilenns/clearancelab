import { Scenario } from "@/db/scenarios";
import {
  capitalizeFirst,
  getFormattedClearanceLimit,
  getFormattedDepartureFrequency,
  getTelephony,
  spellSquawk,
} from "@workspace/plantools";

interface CraftProperties {
  scenario: Scenario;
}

export function Craft({ scenario }: CraftProperties) {
  const {
    craft_controllerName,
    craft_altitude,
    craft_clearanceLimit,
    craft_frequency,
    craft_route,
    craft_telephony,
    airportConditions_departureOnline,
    plan_bcn,
    plan_aid,
    destAirportInfo,
  } = scenario;
  const clearanceLimit = destAirportInfo?.name ?? craft_clearanceLimit;

  return (
    <section role="region" aria-label="Clearance information">
      <p className="space-x-1">
        <span key="telephony">{getTelephony(craft_telephony, plan_aid)}, </span>
        <span>{craft_controllerName}. </span>
        {clearanceLimit && (
          <>
            <span>Cleared to</span>
            <span>
              {getFormattedClearanceLimit(
                destAirportInfo?.name,
                craft_clearanceLimit,
              )}
            </span>
          </>
        )}
        {craft_route && <span>via the {craft_route}.</span>}
        {craft_altitude && <span>{capitalizeFirst(craft_altitude)}.</span>}
        <span>
          Departure{" "}
          {getFormattedDepartureFrequency(
            airportConditions_departureOnline,
            craft_frequency,
          )}
          .
        </span>
        {plan_bcn && <span>Squawk {spellSquawk(plan_bcn.toString())}.</span>}
      </p>
    </section>
  );
}
