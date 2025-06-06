import { VatsimData } from "./types";
import VatsimEndpoints from "./types/vatsim-endpoints";

interface CachedEndpoints {
  data: VatsimEndpoints;
  timestamp: number;
}

let cachedEndpoints: CachedEndpoints | undefined;
const CACHE_TTL = 60 * 60 * 1000; // One hour

const endpointUrl = "https://status.vatsim.net/status.json";

export async function getApiEndpoints(): Promise<VatsimEndpoints> {
  if (cachedEndpoints && Date.now() - cachedEndpoints.timestamp < CACHE_TTL) {
    return cachedEndpoints.data;
  }

  const response = await fetch(endpointUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch endpoints");
  }

  const endpoints = (await response.json()) as VatsimEndpoints;

  cachedEndpoints = {
    data: endpoints,
    timestamp: Date.now(),
  };

  return endpoints;
}

export async function getVatsimData(): Promise<VatsimData> {
  try {
    const endpoint = await getApiEndpoints();

    const response = await fetch(endpoint.data.v3[0]);

    if (!response.ok) throw new Error("Failed to fetch VATSIM data");

    const data = (await response.json()) as VatsimData;

    return data;
  } catch (error) {
    console.error("Failed to fetch VATSIM data:", error);
    throw error;
  }
}
