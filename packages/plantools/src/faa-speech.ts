/* eslint-disable @typescript-eslint/no-misused-spread */
/* eslint-disable security/detect-object-injection */

const digitWords: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
};

export function spellSquawk(code: string): string {
  const digits = code.replaceAll(/\D/g, "").padStart(4, "0").slice(-4);
  return [...digits].map((d: string) => digitWords[d]).join(" ");
}

export function spellFrequency(freq: string | number): string {
  const stringVersion = typeof freq === "number" ? freq.toFixed(3) : freq;
  const [left, right] = stringVersion.split(".");

  const leftPart = [...left.replaceAll(/\D/g, "")]
    .map((d: string) => digitWords[d])
    .join(" ");

  // Handle case when there's no decimal point
  const rightPart = right
    ? [...right.replace(/0+$/, "")].map((d: string) => digitWords[d]).join(" ")
    : "";

  return right ? `${leftPart} point ${rightPart}` : leftPart;
}
