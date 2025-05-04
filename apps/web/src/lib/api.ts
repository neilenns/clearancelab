import { getAuth0Client } from "@/lib/auth0";
import { ENV } from "./environment";

interface ApiRequestOptions {
  withAuthToken?: boolean;
}

export type ApiResponse<T> =
  | {
      status: number;
      data: T | undefined;
    }
  | undefined;

async function apiRequest<T = unknown>(
  method: string,
  path: string,
  body?: T,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
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
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    if (response.status === 404) {
      return;
    }

    if (response.status === 401) {
      throw new Error(`Unauthorized access, please check your credentials.`);
    }

    const message = await response.text();
    throw new Error(`API error ${response.status.toString()}: ${message}`);
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  const data =
    isJson && response.status !== 204
      ? ((await response.json()) as T)
      : undefined;

  return {
    data,
    status: response.status,
  };
}

export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
  return apiRequest<T>("GET", path, undefined, options);
}

export async function postJson<T>(
  path: string,
  body: T,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
  return apiRequest<T>("POST", path, body, options);
}

export async function putJson<T>(
  path: string,
  body: T,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
  return apiRequest<T>("PUT", path, body, options);
}

export async function apiDelete(path: string): Promise<ApiResponse<void>> {
  return apiRequest<void>("DELETE", path);
}
