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

export function getRandomName(): string {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
}

export function getRandomBcn(): number {
  // These are the ZSE ranges.
  const ranges: [number, number][] = [
    [650, 677],
    [2236, 2277],
    [3430, 3477],
    [7412, 7477],
  ];

  const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
  const value =
    Math.floor(Math.random() * (selectedRange[1] - selectedRange[0] + 1)) +
    selectedRange[0];

  return value;
}

export function getRandomVatsimId(): number {
  // Reasonable range starting with early accounts through to almost current IDs.
  const min = 870_000;
  const max = 1_930_000;
  return getRandomInt(min, max);
}

export function getRandomCid(): number {
  const min = 1;
  const max = 999;
  return getRandomInt(min, max);
}

export function getRandomCallsign(): string {
  const code = airlineCodes[getRandomInt(0, airlineCodes.length - 1)];
  const number = getRandomInt(0, 9999).toString().padStart(3, "0");
  return `${code}${number}`;
}
