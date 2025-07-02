import { connectToDatabase } from "@/lib/database";
import { AirportInfo, AirportInfoData } from "@/models/airport-info";
import { AirportInformation } from "./client-section";

export default async function Page() {
  let airportInfo: AirportInfoData | undefined;

  try {
    await connectToDatabase();
    airportInfo = (await AirportInfo.findByAirportCode("KSEA")) ?? undefined;
    console.log("Fetched airport info for KSEA:", airportInfo);
  } catch (error) {
    console.error("Failed to fetch airport info for KSEA:", error);
  }

  return (
    <main className="flex h-full flex-col px-6">
      <AirportInformation airportDetails={airportInfo} />
    </main>
  );
}
