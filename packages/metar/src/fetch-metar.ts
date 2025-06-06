import QuickLRU from "quick-lru";
import Metar from "./types/metar";

const cache = new QuickLRU<string, Metar>({
  maxSize: 100,
  maxAge: 10 * 60 * 1000, // Ten minutes
});

export async function fetchMetarFromAviationWeather(
  airportCode?: string,
): Promise<Metar | undefined> {
  if (!airportCode) {
    return;
  }

  // Check for cached data first
  const key = airportCode.toUpperCase();
  const cached = cache.get(key);

  if (cached) {
    console.log(`Found valid cached metar for ${key}`);
    return cached;
  } else {
    console.log(`Found expired cached metar for ${key}`);
  }

  const endpointUrl = `https://aviationweather.gov/cgi-bin/data/metar.php?ids=${airportCode}&hours=0&order=id%2C-obs&sep=true&format=json`;

  try {
    const response = await fetch(endpointUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch metar");
    }

    const weatherData = (await response.json()) as Metar[];

    const metar = weatherData.find((metar) => metar.icaoId === airportCode);
    if (metar?.altim) {
      // The altimeter comes in as hPa and everything I've written assumes InHg. Convert it.
      metar.altim *= 0.029_529_983_071_445;
    }

    // Cache the data if it was found.
    if (metar) {
      cache.set(key, metar);
    }

    return metar;
  } catch (error) {
    console.error(`Error fetching METAR for ${airportCode}`, error);
    throw new Error(`Error fetching METAR for ${airportCode}`);
  }
}
