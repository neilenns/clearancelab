// lib/api.ts
export async function apiFetch<T>(path: string): Promise<T | null> {
  const baseUrl = process.env.API_BASE_URL;
  const apiKey  = process.env.API_KEY;

  if (!baseUrl) {
    throw new Error("API_BASE_URL env var is missing");
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { "x-api-key": apiKey ?? "" },
    });

    if (!response.ok) {
      // Propagate status & body so the caller can decide.
      const message = await response.text();
      throw new Error(`API error ${response.status}: ${message}`);
    }

    return (await response.json()) as T;
  } catch (err) {
    // Optionally log here
    throw err;
  }
}
