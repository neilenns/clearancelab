import { AirportInfoData } from "@/models/airport-info";

interface AirportInformationProperties {
  airportDetails?: AirportInfoData;
}

export function AirportInformation({
  airportDetails,
}: AirportInformationProperties) {
  return (
    <section>
      <h2>Airport Information</h2>
      <p>Airport Code: {airportDetails?.airportCode}</p>
      <p>Airport Name: {airportDetails?.name}</p>
    </section>
  );
}
