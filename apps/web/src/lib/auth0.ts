import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";
import { ENV } from "./environment";

let auth0Client: Auth0Client;

interface DecodedAccessToken {
  permissions?: string[];
}

export enum Permissions {
  DeleteScenarios = "delete:scenarios",
  AddScenarios = "add:scenarios",
  ViewLab = "view:lab",
  ViewAdmin = "view:admin",
  EditScenarios = "edit:scenarios",
}

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

    // So picky, but Auth0 requires a trailing slash on the URL.
    if (!url.endsWith("/")) {
      url += "/";
    }
    return url;
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
  );

export const getAuth0Client = () => {
  if (!auth0Client) {
    auth0Client = new Auth0Client({
      authorizationParameters: {
        scope: "openid",
        audience: ENV.AUTH0_AUDIENCE!,
      },
      // Before saving the session, decode the access token to get the permissions
      // and add them to the session object.
      async beforeSessionSaved(session, idToken) {
        if (!idToken || !session.tokenSet?.accessToken) {
          return session;
        }

        // The permissions are automatically added to the accessToken by auth0.
        const decodedToken = jwtDecode<DecodedAccessToken>(
          session.tokenSet.accessToken,
        );

        return {
          ...session,
          user: {
            ...session.user,
            permissions: decodedToken.permissions ?? [],
          },
        };
      },
    });
  }

  return auth0Client;
};
