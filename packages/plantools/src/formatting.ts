import { spellFrequency } from "./faa-speech";

const AirlineCodeRegexPattern = /\b([A-Za-z]{3})([A-Za-z\d]+)\b/;

export function generateIssueTitle(
  departure: string | undefined,
  destination: string | undefined,
  aid: string,
): string {
  const title = `Issue with scenario ${departure ?? ""} - ${destination ?? ""} (${aid})`;

  return encodeURIComponent(title);
}

export function generateIssueBody(id: number): string {
  const scenarioUrl = `https://clearancelab.badcasserole.com/lab/${id.toString()}`;
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
 * clearance limit from the craft object.
 * @param airportName The name of the destination airport, or undefined if not available
 * @param clearanceLimit The clearance limit string from the craft object
 * @returns The formatted clearance limit for the flight
 */
export const getFormattedClearanceLimit = (
  airportName: string | undefined,
  clearanceLimit: string | undefined,
) => {
  const formattedClearanceLimit = airportName ?? clearanceLimit ?? "";

  return formatAirportName(formattedClearanceLimit);
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
 * @param craftTelephony The telephony information from the craft object
 * @param aid The flight callsign or identifier
 * @returns The CRAFT telephony, or the flight callsign if not available
 */
export const getTelephony = (
  craftTelephony: string | undefined,
  aid: string,
) => {
  // Using || here is intentional to get a falsy check on empty strings.
  // Using ?? won't work since empty strings aren't null or undefined.
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const result = craftTelephony?.trim() || aid;
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
 * @param departure The departure airport ICAO code
 * @param destination The destination airport ICAO code
 * @returns The FlightAware URL as a string
 */
export const getFlightAwareUrl = (departure?: string, destination?: string) => {
  if (!departure || !destination) {
    return;
  }

  return `https://flightaware.com/analysis/route.rvt?origin=${departure}&destination=${destination}`;
};

/**
 * Returns the SkyVector URL for the flight based on departure, route, and destination.
 * @param departure The departure airport ICAO code
 * @param destination The destination airport ICAO code
 * @param route The flight route as a string
 * @returns The SkyVector URL as a string
 */
export const getSkyVectorUrl = (
  departure?: string,
  destination?: string,
  route?: string,
) => {
  if (!departure || !destination || !route) {
    return;
  }

  const flightPlanString = `${departure} ${route} ${destination}`;

  return `https://skyvector.com/?fpl=${encodeURIComponent(flightPlanString)}`;
};

/**
 * Returns the formatted departure frequency for the flight.
 * @param scenario The scenario object containing information about the flight
 * @returns The formatted departure frequency as a string, or "offline" if not available
 */
export const getFormattedDepartureFrequency = (
  departureOffline: boolean,
  departure: number | string | null = "offline",
) => {
  if (departureOffline) {
    return "offline";
  }

  return typeof departure === "number"
    ? `is ${spellFrequency(departure)}`
    : departure;
};
