import { ENV } from "./env";

async function apiRequest<T>(
  method: string,
  path: string,
  body?: T
): Promise<T | null> {
  const baseUrl = ENV.API_BASE_URL;
  const apiKey = ENV.API_KEY;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(apiKey ? { "x-api-key": apiKey } : {}),
  };

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Resource not found");
    }

    if (response.status === 401) {
      throw new Error(`Unauthorized access, please check your credentials.`);
    }

    const message = await response.text();
    throw new Error(`API error ${response.status.toString()}: ${message}`);
  }

  return (await response.json()) as T;
}

export async function apiFetch<T>(path: string): Promise<T | null> {
  return apiRequest<T>("GET", path);
}

export async function postJson<T>(path: string, body: T): Promise<T | null> {
  return apiRequest<T>("POST", path, body);
}

export async function putJson<T>(path: string, body: T): Promise<T | null> {
  return apiRequest<T>("PUT", path, body);
}
