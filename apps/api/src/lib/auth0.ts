import { ManagementClient } from "auth0";
import { ENV } from "./env.js"; // adjust path as needed

let instance: ManagementClient | null = null;

export const getAuth0ManagementClient = (): ManagementClient => {
  instance ??= new ManagementClient({
    domain: ENV.AUTH0_DOMAIN,
    clientId: ENV.AUTH0_CLIENT_ID,
    clientSecret: ENV.AUTH0_CLIENT_SECRET,
  });

  return instance;
};
