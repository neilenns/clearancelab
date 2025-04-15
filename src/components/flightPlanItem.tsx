import { FlightPlan } from "@/interfaces/flightPlan";
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
      className={clsx("fpe-plan-item", { "fpe-plan-item-selected": selected })}
      onClick={onClick}
    >
      {plan.dep} - {plan.dest}
    </li>
  );
}
