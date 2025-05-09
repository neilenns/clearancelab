import { getAuth0Client } from "@/lib/auth0";
import { ENV } from "./environment";

interface ApiRequestOptions {
  withAuthToken?: boolean;
  cache?: RequestCache;
}

async function apiRequest(
  method: string,
  path: string,
  body?: object,
  options: ApiRequestOptions = {},
) {
  const baseUrl = ENV.API_BASE_URL;
  const apiKey = ENV.API_KEY;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(apiKey ? { "x-api-key": apiKey } : {}),
  };

  const disableAuth = ENV.DISABLE_AUTH && ENV.NODE_ENV === "development";

  if (options.withAuthToken && !disableAuth) {
    try {
      const token = await getAuth0Client().getAccessToken();
      headers.Authorization = `Bearer ${token.token}`;
    } catch (error) {
      console.error("Failed to request auth token", error);
    }
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    cache: options.cache,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Resource not found: ${path}`);
    }

    if (response.status === 401) {
      throw new Error(`Unauthorized access, please check your credentials.`);
    }

    const message = await response.text();
    throw new Error(`API error ${response.status.toString()}: ${message}`);
  }

  return response;
}

export async function getJson(path: string, options: ApiRequestOptions = {}) {
  return apiRequest("GET", path, undefined, options);
}

export async function postJson(
  path: string,
  body: object,
  options: ApiRequestOptions = {},
) {
  return apiRequest("POST", path, body, options);
}

export async function putJson(
  path: string,
  body: object,
  options: ApiRequestOptions = {},
) {
  return apiRequest("PUT", path, body, options);
}

export async function apiDelete(path: string, options: ApiRequestOptions = {}) {
  return apiRequest("DELETE", path, undefined, options);
}
