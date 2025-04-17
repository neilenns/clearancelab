export function formatAirportName(name: string): string {
  return name.endsWith("Airport") ? name : `${name} Airport`;
}
