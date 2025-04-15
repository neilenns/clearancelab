import { FlightPlan } from "@/interfaces/flightPlan";

interface FlightPlanProps {
  plan: FlightPlan;
  selected: boolean;
  onClick: () => void;
}

export default function FlightPlanItem({
  plan,
  selected,
  onClick,
}: FlightPlanProps) {
  return (
    <li
      className={`hover:underline cursor-pointer ${
        selected ? "bg-blue-200 font-semibold" : ""
      }`}
      onClick={onClick}
    >
      {plan.dep} - {plan.dest}
    </li>
  );
}
