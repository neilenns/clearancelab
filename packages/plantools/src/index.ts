export function isValidRoute(route: string): boolean {
  return /^[A-Z]{3,5}$/.test(route); // e.g., basic check for ICAO codes
}

export function isValidCallsign(callsign: string): boolean {
  return /^[A-Za-z]{3}\d{1,4}$/.test(callsign);
}
