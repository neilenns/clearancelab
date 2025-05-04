import { Plan, Scenario } from "@workspace/validators";

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})([A-Za-z\d]+)\b/;

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
 * clearance limit from the craft object.
 * @param scenario The scenario object containing information about the flight
 * @returns The formatted clearance limit for the flight
 */
export const getFormattedClearanceLimit = (scenario: Scenario) => {
  const { destAirportInfo, craft } = scenario;
  const clearanceLimit = destAirportInfo?.name ?? craft?.clearanceLimit;

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
  return scenario.craft?.telephony ?? scenario.plan.aid;
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
