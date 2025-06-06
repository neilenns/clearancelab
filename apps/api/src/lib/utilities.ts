import { AirlineModel } from "@models/airlines.js";
import {
  getWeightClass,
  spellCallsign,
  spellGroupForm,
  splitCallsign,
} from "@workspace/plantools";
import { Scenario } from "@workspace/validators";
import * as changeCase from "change-case";

export async function getCallsignTelephony(scenario: Scenario) {
  // Calculate the telephony string.
  const callsignParts = splitCallsign(scenario.plan.aid);
  const weightClass = getWeightClass(scenario.plan.typ ?? "")?.toLowerCase();

  const airline = callsignParts
    ? await AirlineModel.findByAirlineCode(callsignParts.airlineCode)
    : undefined;

  // If an airline was found, and the callsign was able to get split, use the airline's telephony and the flight number in group form.
  // Otherwise, fall back to just spelling out the callsign.
  let spokenCallsign: string;
  if (airline && callsignParts) {
    try {
      spokenCallsign = `${changeCase.capitalCase(airline.telephony)} ${spellGroupForm(
        callsignParts.flightNumber,
      )}`;
    } catch {
      // Fallback to a fully-spelled callsign if the flight number is invalid
      spokenCallsign = spellCallsign(scenario.plan.aid);
    }
  } else {
    spokenCallsign = spellCallsign(scenario.plan.aid);
  }

  const telephony = [
    spokenCallsign,
    weightClass, // The weight class, if found
  ]
    .filter(Boolean) // Removes any falsy values like null, undefined, or empty strings
    .join(" ");

  return telephony;
}
