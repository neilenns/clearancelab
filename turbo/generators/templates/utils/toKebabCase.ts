export const toKebabCase = (string: string): string => {
  // Handle acronyms by treating consecutive uppercase letters as one unit
  // except when followed by a lowercase letter
  const withSeparators = string
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z])([A-Z])/g, "$1-$2");

  // Replace non-alphanumeric characters, spaces, and underscores with hyphens
  const normalized = withSeparators.replace(/[^a-zA-Z0-9]+/g, "-");

  // Remove leading and trailing hyphens and convert to lowercase
  return normalized.replace(/^-+|-+$/g, "").toLowerCase();
};
