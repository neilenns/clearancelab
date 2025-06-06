import Metar from "./types/metar";

export async function fetchMetarFromAviationWeather(
  airportCode?: string,
): Promise<Metar | undefined> {
  if (!airportCode) {
    return;
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

    return metar;
  } catch (error) {
    console.error(`Error fetching METAR for ${airportCode}`, error);
    throw new Error(`Error fetching METAR for ${airportCode}`);
  }
}
