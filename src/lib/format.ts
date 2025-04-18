/**
 * Formats an airport name by appending "Airport" if not already present
 * @param name The airport name to format
 * @returns The formatted airport name
 */
export function formatAirportName(name?: string): string {
  if (!name) {
    return "";
  }

  return name.endsWith("Airport") ? name : `${name} Airport`;
}
