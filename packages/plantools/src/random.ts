/* eslint-disable security/detect-object-injection */
import { FlowDirection, Scenario } from "@workspace/validators";

// cSpell:disable
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
Object.freeze(names);

const airlineCodes = [
  "AAL",
  "ACA",
  "AFR",
  "ANA",
  "ASA",
  "BAW",
  "DAL",
  "DLH",
  "ENY",
  "FFT",
  "JAL",
  "JBU",
  "KLM",
  "NKS",
  "QFA",
  "QXE",
  "SIA",
  "SKW",
  "SWA",
  "UAE",
  "UAL",
];
Object.freeze(airlineCodes);

const airportCodes = [
  "CYBR",
  "CYCD",
  "CYEG",
  "CYLW",
  "CYQQ",
  "CYVR",
  "CYXX",
  "CYYC",
  "CYYJ",
  "CYYZ",
  "EDDF",
  "EGKK",
  "EGLL",
  "EHAM",
  "KABQ",
  "KALB",
  "KANC",
  "KATL",
  "KBOI",
  "KBOS",
  "KBUF",
  "KBWI",
  "KCHS",
  "KCLT",
  "KCMH",
  "KCVG",
  "KDCA",
  "KDEN",
  "KDFW",
  "KDTW",
  "KELP",
  "KEUG",
  "KEWR",
  "KFAI",
  "KGEG",
  "KGRR",
  "KGSO",
  "KHOU",
  "KHSV",
  "KIAD",
  "KIAH",
  "KIND",
  "KJFK",
  "KLAS",
  "KLAX",
  "KLEX",
  "KLGA",
  "KLIT",
  "KMCO",
  "KMDW",
  "KMEM",
  "KMSP",
  "KMSY",
  "KOAK",
  "KOKC",
  "KOMA",
  "KORD",
  "KORF",
  "KPDX",
  "KPHX",
  "KPIT",
  "KPVD",
  "KRDU",
  "KRIC",
  "KSAN",
  "KSAV",
  "KSEA",
  "KSFO",
  "KSJC",
  "KSLC",
  "KSMF",
  "KSTL",
  "KTPA",
  "KTUS",
  "LFPG",
  "LIRF",
  "LSZH",
  "MMMX",
  "MPTO",
  "MROC",
  "NZAA",
  "OEJN",
  "OMDB",
  "RCTP",
  "RJAA",
  "RJBB",
  "RJTT",
  "RKSI",
  "RPLL",
  "SBGR",
  "SCEL",
  "UUEE",
  "VHHH",
  "VTBS",
  "WSSS",
  "YSSY",
  "ZBAA",
  "ZGGG",
  "ZKPY",
  "ZSPD",
];
Object.freeze(airportCodes);
// cSpell:enable

/**
 * Generates a random integer between the specified min and max values, inclusive.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random integer between min and max.
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random number between the specified min and max values, biased towards the max value.
 * @param min The minimum value.
 * @param max The maximum value.
 * @param biasStrength The strength of the bias towards the max value.
 * @returns A biased random number between min and max.
 */
function biasedRandom(min: number, max: number, biasStrength: number): number {
  const r = Math.random() ** (1 / biasStrength); // skewed toward 1
  return min + (max - min) * r;
}

/**
 * Generates a random altimeter setting between 28.00 and 31.00 inches of mercury.
 * @returns A random altimeter setting.
 */
export function getRandomAltimeter(): number {
  const LOWEST_PRESSURE = 28;
  const HIGHEST_PRESSURE = 31;

  return Number.parseFloat(biasedRandom(LOWEST_PRESSURE, HIGHEST_PRESSURE, 2).toFixed(2));
}

/**
 * Generates a random airport code from a predefined list of airport codes.
 * @returns A random airport code.
 */
export function getRandomAirportCode(): string {
  const index = getRandomInt(0, airportCodes.length - 1);
  return airportCodes[index];
}

/**
 * Generates a scenario with random values populated in the aid, bcn, cid, homeAirport, pilotName,
 * vatsimId, and altimeter fields.
 * @returns A random scenario
 */
export function getRandomScenario(): Scenario {
  return {
    plan: {
      aid: getRandomCallsign(),
      alt: 0,
      bcn: getRandomBcn(),
      cid: getRandomCid(),
      dep: "",
      dest: "",
      eq: "",
      homeAirport: getRandomAirportCode(),
      pilotName: getRandomName(),
      rmk: "",
      rte: "",
      spd: 0,
      typ: "",
      vatsimId: getRandomVatsimId(),
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
    explanations: [],
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
  // prettier-ignore
  const ranges: [number, number][] = [
    [ 650,  677], 
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
