import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { ENV } from "./environment";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: "openid",
    audience: ENV.AUTH0_AUDIENCE,
  },
});
