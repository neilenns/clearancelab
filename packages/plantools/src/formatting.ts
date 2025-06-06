import { Plan, Scenario } from "@workspace/validators";
import { spellFrequency } from "./faa-speech";

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})([A-Za-z\d]+)\b/;

export function generateIssueTitle(scenario: Scenario): string {
  const title = `Issue with scenario ${scenario.plan.dep ?? ""} - ${scenario.plan.dest ?? ""} (${scenario.plan.aid})`;

  return encodeURIComponent(title);
}

export function generateIssueBody(scenario: Scenario): string {
  const scenarioUrl = `https://clearancelab.badcasserole.com/lab/${scenario._id ?? "unknown"}`;
  const bodyContent = `Scenario: ${scenarioUrl}
  
## Issue details

Explain the issue and what the proposed solution is.`;

  return encodeURIComponent(bodyContent);
}

/**
 * Formats an airport name by appending "Airport" if not already present
 * @param name The airport name to format
 * @returns The formatted airport name
 */
export const formatAirportName = (name?: string) => {
  if (!name) {
    return "";
  }

  return name.endsWith("Airport") ? name : `${name} Airport`;
};

/**
 * Returns the formatted clearance limit for a flight. This is either the destination airport name or the
 * clearance limit from the craft object, with the limit from the craft object taking priority.
 * @param scenario The scenario object containing information about the flight
 * @returns The formatted clearance limit for the flight
 */
export const getFormattedClearanceLimit = (scenario: Scenario) => {
  const { destAirportInfo, craft } = scenario;
  const trimmedLimit = craft?.clearanceLimit?.trim();

  const clearanceLimit =
    trimmedLimit && trimmedLimit.length > 0
      ? trimmedLimit
      : destAirportInfo?.name;

  return formatAirportName(clearanceLimit);
};

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize
 * @returns The string with the first letter capitalized
 */
export const capitalizeFirst = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Returns the telephony information for the flight.
 * @param scenario The scenario object containing information about the flight
 * @returns The CRAFT telephony, or the flight callsign if not available
 */
export const getTelephony = (scenario: Scenario) => {
  // Using || here is intentional to get a falsy check on empty strings.
  // Using ?? won't work since empty strings aren't null or undefined.
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const result = scenario.craft?.telephony?.trim() || scenario.plan.aid;
  return result;
};

/**
 * Splits a flight callsign into its airline code and flight number.
 * @param callsign The flight callsign to split
 * @returns An object containing the airline code and flight number, or undefined if the callsign cannot be split.
 */
export const splitCallsign = (callsign: string) => {
  const regexMatch = AirlineCodeRegexPattern.exec(callsign);

  if (regexMatch && regexMatch.length > 0) {
    const airlineCode = regexMatch[1];
    const flightNumber = regexMatch[2];
    return { airlineCode, flightNumber };
  }
};

/**
 * Returns the weight class based on the equipment type.
 * @param equipmentType The equipment type string to check
 * @returns The weight class as a string, either "Heavy", "Super", or an empty string.
 */
export const getWeightClass = (equipmentType: string) => {
  if (equipmentType.startsWith("H/")) {
    return "Heavy";
  }

  if (equipmentType.startsWith("S/")) {
    return "Super";
  }
};

/**
 * Returns the FlightAware URL for the flight based on departure and destination.
 * @param scenario The scenario object containing information about the flight
 * @returns The FlightAware URL as a string
 */
export const getFlightAwareUrl = (plan: Plan | undefined) => {
  if (!plan) {
    return;
  }

  const { dep, dest } = plan;

  if (!dep || !dest) {
    return;
  }

  return `https://flightaware.com/analysis/route.rvt?origin=${dep}&destination=${dest}`;
};

/**
 * Returns the SkyVector URL for the flight based on departure, route, and destination.
 * @param scenario The scenario object containing information about the flight
 * @returns The SkyVector URL as a string
 */
export const getSkyVectorUrl = (plan: Plan | undefined) => {
  if (!plan) {
    return;
  }

  const { dep, dest, rte } = plan;

  if (!dep || !dest || !rte) {
    return;
  }

  const flightPlanString = `${dep} ${rte} ${dest}`;

  return `https://skyvector.com/?fpl=${encodeURIComponent(flightPlanString)}`;
};

/**
 * Returns the formatted departure frequency for the flight.
 * @param scenario The scenario object containing information about the flight
 * @returns The formatted departure frequency as a string, or "offline" if not available
 */
export const getFormattedDepartureFrequency = (scenario: Scenario) => {
  const { craft } = scenario;

  if (!scenario.airportConditions.departureOnline) {
    return "offline";
  }

  const departure = craft?.frequency ?? "offline";

  return typeof departure === "number"
    ? `is ${spellFrequency(departure)}`
    : departure;
};
