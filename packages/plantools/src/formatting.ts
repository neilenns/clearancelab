import { Scenario } from "@workspace/validators";

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
