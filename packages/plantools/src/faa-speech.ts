/* eslint-disable @typescript-eslint/no-misused-spread */
/* eslint-disable security/detect-object-injection */

const digitWords = [
  "zero",
  "one",
  "two",
  "tree",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "niner",
];

const teenWords = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tensWords = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

export function spellSquawk(code: string): string {
  const digits = code.replaceAll(/\D/g, "").padStart(4, "0").slice(-4);
  return [...digits].map((d: string) => digitWords[Number(d)]).join(" ");
}

export function spellFrequency(freq: string | number): string {
  const stringVersion = typeof freq === "number" ? freq.toFixed(3) : freq;
  const [left, right] = stringVersion.split(".");

  const leftPart = [...left.replaceAll(/\D/g, "")]
    .map((d: string) => digitWords[Number(d)])
    .join(" ");

  // Handle case when there's no decimal point
  const rightPart = right
    ? [...right.replace(/0+$/, "")]
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

export function spellGroupForm(
  input: number | string | undefined,
): string | undefined {
  if (input === undefined) {
    return undefined;
  }

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
    return `${twoDigit(firstGroup)} ${twoDigit(secondGroup)}`;
  }
}
