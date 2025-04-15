import { FlightPlan } from "@/interfaces/flightPlan";
import Hoverable from "./hoverable";

const craftLabels = {
  clearanceLimit: "C: Clearance Limit",
  route: "R: Route",
  altitude: "A: Altitude",
  frequency: "F: Frequency",
  transponder: "T: Transponder Code",
};

interface CraftProps {
  plan: FlightPlan;
}

export default function Craft({ plan }: CraftProps) {
  const parts: React.ReactNode[] = [];

  if (plan.craft?.telephony) {
    parts.push(<span key="telephony">{plan.craft.telephony}, </span>);
  }

  if (plan.craft?.clearanceLimit) {
    parts.push(
      <span key="clearanceLimit">
        <Hoverable
          label={craftLabels.clearanceLimit}
          text={`cleared to ${plan.craft.clearanceLimit}`}
        />
      </span>
    );
  }

  if (plan.craft?.route) {
    parts.push(
      <span key="route">
        {" "}
        via{" "}
        <Hoverable
          label={craftLabels.route}
          text={` ${plan.craft.route}`}
        />.{" "}
      </span>
    );
  }

  if (plan.craft?.altitude) {
    parts.push(
      <span key="altitude">
        <Hoverable label={craftLabels.altitude} text={plan.craft.altitude} />.{" "}
      </span>
    );
  }

  if (plan.craft?.frequency) {
    parts.push(
      <span key="frequency">
        <Hoverable
          label={craftLabels.frequency}
          text={`Departure is ${plan.craft.frequency}`}
        />
        .{" "}
      </span>
    );
  }

  if (plan.craft?.transponder) {
    parts.push(
      <span key="transponder">
        <Hoverable
          label={craftLabels.transponder}
          text={`Squawk ${plan.craft.transponder}`}
        />
        .
      </span>
    );
  }

  return (
    <p className="leading-relaxed">
      {parts.map((part, idx) => (
        <span key={idx}>{part}</span>
      ))}
    </p>
  );
}
