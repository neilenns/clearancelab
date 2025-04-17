// lib/api.ts
export async function apiFetch<T>(path: string): Promise<T | null> {
  const baseUrl = process.env.API_BASE_URL ?? "";
  const apiKey = process.env.API_KEY ?? "";

  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}
