/* eslint-disable @typescript-eslint/no-misused-spread */
/* eslint-disable security/detect-object-injection */
// prettier-multiline-arrays-set-threshold: 1
// prettier-multiline-arrays-set-line-pattern: 5

const digitWords = [
  "zero", "one", "two", "tree", "four",
  "fife", "six", "seven", "eight", "niner",
];

const teenWords = [
  "ten", "eleven", "twelve", "thirteen", "fourteen",
  "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];

const tensWords = [
  "", "", "twenty", "thirty", "forty",
  "fifty", "sixty", "seventy", "eighty", "ninety",
];

const phoneticMap: Record<string, string> = {
  A: "Alpha",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliet",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
};

export function spellSquawk(code: string): string {
  const digits = code.replaceAll(/\D/g, "").padStart(4, "0").slice(-4);
  return [
    ...digits,
  ]
    .map((d: string) => digitWords[Number(d)])
    .join(" ");
}

export function spellFrequency(freq: string | number): string {
  const stringVersion = typeof freq === "number" ? freq.toFixed(3) : freq;
  const [
    left, right,
  ] = stringVersion.split(".");

  const leftPart = [
    ...left.replaceAll(/\D/g, ""),
  ]
    .map((d: string) => digitWords[Number(d)])
    .join(" ");

  // Handle case when there's no decimal point
  const rightPart = right
    ? [
        ...right.replace(/0+$/, ""),
      ]
        .map((d: string) => digitWords[Number(d)])
        .join(" ")
    : "";

  return right ? `${leftPart} point ${rightPart}` : leftPart;
}

const twoDigit = (n: number): string => {
  if (n < 10) return digitWords[n];
  if (n < 20) return teenWords[n - 10];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return ones === 0
    ? tensWords[tens]
    : `${tensWords[tens]}-${digitWords[ones]}`;
};

export function spellGroupForm(input: number | string): string {
  const raw =
    typeof input === "string" ? input.replace(/^0+/, "") : input.toString();
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n) || n < 1 || n > 9999)
    throw new Error("Input must be a number between 1 and 9999");

  if (n < 100) {
    return twoDigit(n);
  } else if (n < 1000) {
    if (n % 100 === 0) {
      return `${digitWords[n / 100]} hundred`;
    }

    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    return `${digitWords[hundreds]} ${twoDigit(rest)}`;
  } else {
    const firstGroup = Math.floor(n / 100);
    const secondGroup = n % 100;
    if (secondGroup === 0) {
      return `${twoDigit(firstGroup)} hundred`;
    }
    return `${twoDigit(firstGroup)} ${twoDigit(secondGroup)}`;
  }
}

export function spellCallsign(input: string): string {
  return [
    ...input.toUpperCase(),
  ]
    .map((char) => {
      if (/\d/.test(char)) return digitWords[+char];
      if (/[A-Z]/.test(char)) return phoneticMap[char];
      throw new Error(`Invalid character in callsign: ${char}`);
    })
    .join(" ");
}
