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

export function getRandomName(): string {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
}

export function getRandomBcn(): number {
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
