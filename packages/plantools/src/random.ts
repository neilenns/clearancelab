import { FlowDirection, Scenario } from "@workspace/validators";

const names: string[] = [
  "Alejandro",
  "Alex",
  "Amara",
  "Amari",
  "Amina",
  "Amir",
  "Anika",
  "Aoife",
  "Ari",
  "Arjun",
  "Ash",
  "Avery",
  "Bailey",
  "Benoît",
  "Blair",
  "Briar",
  "Cameron",
  "Camila",
  "Casey",
  "Chiara",
  "Dakota",
  "Devan",
  "Dmitri",
  "Drew",
  "Eden",
  "Elias",
  "Ellis",
  "Elsa",
  "Emery",
  "Enzo",
  "Finley",
  "Freya",
  "Hugo",
  "Idris",
  "Indigo",
  "Ines",
  "Isabella",
  "Jordan",
  "Jules",
  "Kendall",
  "Lane",
  "Layla",
  "Leif",
  "Lennox",
  "Logan",
  "Luca",
  "Lucía",
  "Marley",
  "Mateo",
  "Mei",
  "Micah",
  "Morgan",
  "Naomi",
  "Niko",
  "Noa",
  "Noor",
  "Peyton",
  "Phoenix",
  "Quinn",
  "Quinnley",
  "Raj",
  "Reese",
  "Remy",
  "Ren",
  "Riley",
  "Rio",
  "River",
  "Robin",
  "Rowan",
  "Saanvi",
  "Sage",
  "Sasha",
  "Seamus",
  "Shiloh",
  "Sky",
  "Skyler",
  "Sloane",
  "Sofia",
  "Soren",
  "Tao",
  "Tatum",
  "Taylor",
  "Thiago",
  "Tobi",
  "Yael",
  "Yara",
  "Yuna",
  "Zara",
  "Zubair",
  "Zuri",
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

function biasedRandom(min: number, max: number, biasStrength: number): number {
  const r = Math.random() ** (1 / biasStrength); // skewed toward 1
  return min + (max - min) * r;
}

export function getRandomAltimeter(): number {
  const LOWEST_PRESSURE = 28;
  const HIGHEST_PRESSURE = 31;

  return Number.parseFloat(
    biasedRandom(LOWEST_PRESSURE, HIGHEST_PRESSURE, 2).toFixed(2)
  );
}

export function getRandomScenario(): Scenario {
  return {
    plan: {
      aid: getRandomCallsign(),
      bcn: getRandomBcn(),
      cid: getRandomCid(),
      pilotName: getRandomName(),
      vatsimId: getRandomVatsimId(),
      dep: "",
      dest: "",
      typ: "",
      eq: "",
      rte: "",
      rmk: "",
      spd: 0,
      alt: 0,
    },
    isValid: true,
    canClear: true,
    craft: {
      clearanceLimit: "",
      route: "",
      altitude: "",
      frequency: "",
      transponder: "",
    },
    airportConditions: {
      flow: FlowDirection.WEST,
      altimeter: getRandomAltimeter(),
      departureOnline: false,
    },
    problems: [],
  };
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
