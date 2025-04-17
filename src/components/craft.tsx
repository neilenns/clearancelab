import { ScenarioData } from "@/models/scenario";
import Hoverable from "./hoverable";

const craftLabels = {
  clearanceLimit: "C: Clearance Limit",
  route: "R: Route",
  altitude: "A: Altitude",
  frequency: "F: Frequency",
  transponder: "T: Transponder Code",
};

interface CraftProps {
  scenario: ScenarioData;
}

export default function Craft({ scenario }: CraftProps) {
  const { craft } = scenario;

  const parts: React.ReactNode[] = [];

  if (craft?.telephony) {
    parts.push(<span key="telephony">{craft.telephony}, </span>);
  }

  if (craft?.clearanceLimit) {
    parts.push(
      <span key="clearanceLimit">
        <Hoverable
          label={craftLabels.clearanceLimit}
          text={`cleared to ${craft.clearanceLimit}`}
        />
      </span>
    );
  }

  if (craft?.route) {
    parts.push(
      <span key="route">
        {" "}
        via <Hoverable
          label={craftLabels.route}
          text={` ${craft.route}`}
        />.{" "}
      </span>
    );
  }

  if (craft?.altitude) {
    parts.push(
      <span key="altitude">
        <Hoverable label={craftLabels.altitude} text={craft.altitude} />.{" "}
      </span>
    );
  }

  if (craft?.frequency) {
    parts.push(
      <span key="frequency">
        <Hoverable
          label={craftLabels.frequency}
          text={`Departure is ${craft.frequency}`}
        />
        .{" "}
      </span>
    );
  }

  if (craft?.transponder) {
    parts.push(
      <span key="transponder">
        <Hoverable
          label={craftLabels.transponder}
          text={`Squawk ${craft.transponder}`}
        />
        .
      </span>
    );
  }

  return <p className="leading-relaxed">{parts}</p>;
}
