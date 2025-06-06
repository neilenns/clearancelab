import { VatsimData } from "./types";
import VatsimEndpoints from "./types/vatsim-endpoints";

const endpointUrl = "https://status.vatsim.net/status.json";

let cachedEndpoints: VatsimEndpoints;

export async function getApiEndpoints(): Promise<VatsimEndpoints> {
  if (cachedEndpoints) return cachedEndpoints;

  const response = await fetch(endpointUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch endpoints");
  }

  cachedEndpoints = (await response.json()) as VatsimEndpoints;

  return cachedEndpoints;
}

export async function getVatsimData(): Promise<VatsimData> {
  try {
    const endpoint = await getApiEndpoints();

    const response = await fetch(endpoint.data.v3[0]);

    if (!response.ok) throw new Error("Failed to fetch VATSIM data");

    const data = (await response.json()) as VatsimData;

    return data;
  } catch (error) {
    console.error("Failed to fetch VATSIM  data:", error);
    throw error;
  }
}
