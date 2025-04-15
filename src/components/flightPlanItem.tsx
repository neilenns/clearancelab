import { FlightPlan } from "@/interfaces/flightPlan";
import "@/styles/flightPlanItem.css";
import clsx from "clsx";
import Link from "next/link";

interface FlightPlanProps {
  plan: FlightPlan;
  selected: boolean;
}

export default function FlightPlanItem({ plan, selected }: FlightPlanProps) {
  return (
    <li>
      <Link
        className={clsx("fp-list-item", { "fp-list-item-selected": selected })}
        href={`/fp/${plan.id.toString()}`}
      >
        {plan.dep} - {plan.dest}
      </Link>
    </li>
  );
}
