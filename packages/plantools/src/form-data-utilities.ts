/* eslint-disable security/detect-object-injection */

/**
 * Converts a value to a boolean.
 * @param value The value to convert
 * @returns The converted boolean value
 */
export const convertToBoolean = (value: unknown) => {
  return value === "true" || value === true;
};

/**
+ * Asserts that a value is a non-null object
+ * @param value - The value to check
+ * @throws Error if the value is not an object or is null
+ */
export const assertObject = (
  value: unknown,
): asserts value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) {
    throw new Error(
      `Expected an object, but received ${value === null ? "null" : typeof value}`,
    );
  }
};

/**
 * Converts a string value to a number, if possible
 * @param value - The value to convert
 * @returns The converted number or undefined if conversion is not possible
 */
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

/**
 * Takes a FormData-flattened object and converts it to a nested object.
 * @param data The object to flatten
 * @returns The nested object
 */
export const unflatten = (
  data: Record<string, unknown>,
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
