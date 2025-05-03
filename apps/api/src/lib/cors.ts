import { type CorsOptions } from "cors";
import { logger } from "./logger.js";

const log = logger.child({ service: "cors" });

let whitelist: string[] = [];

export const setWhitelist = (whitelistedDomains?: string): void => {
  // Support splitting on comma and | to work around a Portainer
  // bug where override environment variables can't include a comma.
  // See https://github.com/portainer/portainer/issues/11091
  // Issue #1027: Sometimes I accidentally include a trailing / on the URLs when specifying
  // the whitelisted domains, which makes that test fail every time since the incoming URLs
  // never have a trailing slash. Add the map to strip the trailing slash if it was provided.
  whitelist =
    whitelistedDomains == undefined
      ? []
      : whitelistedDomains
          .split(/,|\|/)
          .map((domain) => domain.replace(/\/$/, ""));

  log.debug(`Whitelisted domains: ${whitelist.join(",")}`, {
    domains: whitelist,
  });
};

// Function to check if the origin matches any of the whitelisted domains.
const isOriginAllowed = (origin: string): boolean => {
  return whitelist.some((domain) => {
    let result: boolean;

    if (domain.includes("*")) {
      // This is fine, comes from environment variables.
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp("^" + domain.replaceAll("*", "[^.]+") + "$");
      result = regex.test(origin);
    } else {
      result = origin === domain;
    }
    log.debug(
      `Tested ${domain} against ${origin}, result is ${result.toString()}`,
    );
    return result;
  });
};

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || isOriginAllowed(origin)) {
      // eslint-disable-next-line unicorn/no-null
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
