const names: string[] = [
  "Ash",
  "Avery",
  "Bailey",
  "Blair",
  "Briar",
  "Cameron",
  "Casey",
  "Dakota",
  "Drew",
  "Ellis",
  "Emery",
  "Finley",
  "Indigo",
  "Jordan",
  "Jules",
  "Kendall",
  "Lane",
  "Lennox",
  "Logan",
  "Marley",
  "Micah",
  "Morgan",
  "Peyton",
  "Phoenix",
  "Quinn",
  "Quinnley",
  "Reese",
  "Remy",
  "Riley",
  "River",
  "Rowan",
  "Sage",
  "Shiloh",
  "Sky",
  "Skyler",
  "Sloane",
  "Tatum",
  "Taylor",
];

const airlineCodes = [
  // US Airlines
  "AAL", // American Airlines
  "DAL", // Delta Air Lines
  "UAL", // United Airlines
  "SWA", // Southwest Airlines
  "ASA", // Alaska Airlines
  "FFT", // Frontier Airlines
  "JBU", // JetBlue Airways
  "NKS", // Spirit Airlines
  "SKW", // SkyWest Airlines
  "ENY", // Envoy Air
  "QXE", // Horizon Air

  // International Airlines
  "BAW", // British Airways
  "AFR", // Air France
  "DLH", // Lufthansa
  "ACA", // Air Canada
  "KLM", // KLM Royal Dutch Airlines
  "UAE", // Emirates
  "ANA", // All Nippon Airways
  "JAL", // Japan Airlines
  "QFA", // Qantas
  "SIA", // Singapore Airlines
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random pilot name from a predefined list of gender-neutral names.
 * @returns A random pilot name
 */
export function getRandomName(): string {
  const index = getRandomInt(0, names.length - 1);
  return names[index];
}

/**
 * Generates a random beacon from the range of valid beacons in ZSE.
 * @returns A random beacon
 */
export function getRandomBcn(): number {
  // These are the ZSE ranges.
  const ranges: [number, number][] = [
    [650, 677],
    [2236, 2277],
    [3430, 3477],
    [7412, 7477],
  ];

  const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
  const value = getRandomInt(selectedRange[0], selectedRange[1]);

  return value;
}

/**
 * Generates a random VATSIM ID from the range of reasonable actual IDs.
 * @returns A random VATSIM ID
 */
export function getRandomVatsimId(): number {
  const VATSIM_MIN_ID = 810_000;
  const VATSIM_MAX_ID = 1_930_000;
  return getRandomInt(VATSIM_MIN_ID, VATSIM_MAX_ID);
}

/**
 * Generates a random CID.
 * @returns A random CID
 */
export function getRandomCid(): number {
  const min = 1;
  const max = 999;
  return getRandomInt(min, max);
}

/**
 * Generates a random callsign from a list of airline codes and flight numbers between
 * 1 and 9999.
 * @returns A random callsign.
 */
export function getRandomCallsign(): string {
  const code = airlineCodes[getRandomInt(0, airlineCodes.length - 1)];
  const number = getRandomInt(1, 9999).toString().padStart(3, "0");
  return `${code}${number}`;
}
