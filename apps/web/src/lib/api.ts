import { ENV } from "./env";

// lib/api.ts
export async function get<T>(path: string): Promise<T | null> {
  const baseUrl = ENV.API_BASE_URL;
  const apiKey = ENV.API_KEY;

  const response = await fetch(`${baseUrl}${path}`, {
    ...(apiKey ? { headers: { "x-api-key": apiKey } } : null),
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    // Propagate status & body so the caller can decide.
    const message = await response.text();
    throw new Error(`API error ${response.status.toString()}: ${message}`);
  }

  return (await response.json()) as T;
}

export async function postJson<T>(path: string, body: T): Promise<T | null> {
  const baseUrl = ENV.API_BASE_URL;
  const apiKey = ENV.API_KEY;

  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    ...(apiKey ? { headers: { "x-api-key": apiKey } } : null),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    // Propagate status & body so the caller can decide.
    const message = await response.text();
    throw new Error(`API error ${response.status.toString()}: ${message}`);
  }

  return (await response.json()) as T;
}
