const smallNumbers: Record<string, string> = {
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
  return (
    digits
      // eslint-disable-next-line unicorn/prefer-spread
      .split("")
      // eslint-disable-next-line security/detect-object-injection
      .map((d) => smallNumbers[d])
      .join(" ")
  );
}
