import { z } from "zod";

// Normalizes inputs to be an URL that work with Auth0 since they are so wildly
// inconsistent with their URL requirements.
export const auth0url = z
  .string()
  .trim()
  .transform((value) => {
    let url = value;
    if (!/^https:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    return url.replace(/\/+$/, ""); // Strip trailing slashes
  })
  .refine(
    (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Invalid URL",
    },
  )
  .optional();
