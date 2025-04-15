import { FlightPlan } from "@/interfaces/flightPlan";
import "@/styles/flightPlanItem.css";
import clsx from "clsx";

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
      className={clsx("fp-list-item", { "fp-list-item-selected": selected })}
      onClick={onClick}
    >
      {plan.dep} - {plan.dest}
    </li>
  );
}
