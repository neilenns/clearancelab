export const convertToBoolean = (value: unknown) => {
  return value === "true" || value === true;
};

// Convert string values to numbers with validation
export const convertToNumber = (value: unknown): number | undefined => {
  if (value === "") {
    return undefined;
  }

  const convertedValue = Number(value);
  if (Number.isNaN(convertedValue)) {
    return undefined;
  }

  return convertedValue;
};

export const unflatten = (
  data: Record<string, unknown>
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const [flatKey, value] of Object.entries(data)) {
    const keys = flatKey.split(".");
    let current: Record<string, unknown> = result;

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];

      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        if (!(key in current)) {
          current[key] = {};
        }
        current = current[key] as Record<string, unknown>;
      }
    }
  }

  return result;
};
