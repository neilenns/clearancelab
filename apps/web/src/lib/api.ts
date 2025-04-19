import { ENV } from "./env";

// lib/api.ts
export async function apiFetch<T>(path: string): Promise<T | null> {
  const baseUrl = ENV.API_BASE_URL;
  const apiKey = ENV.API_KEY;

  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "x-api-key": apiKey },
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
