import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { ENV } from "./env";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: ENV.AUTH0_SCOPE,
    audience: ENV.AUTH0_AUDIENCE,
  },
});
