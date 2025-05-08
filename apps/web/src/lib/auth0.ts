import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { ENV } from "./environment";

let auth0Client: Auth0Client;

export const getAuth0Client = () => {
  if (!auth0Client) {
    auth0Client = new Auth0Client({
      authorizationParameters: {
        scope: "openid",
        audience: ENV.AUTH0_AUDIENCE,
      },
    });
  }

  return auth0Client;
};
