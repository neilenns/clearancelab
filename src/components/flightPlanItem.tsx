import { FlightPlan } from "@/interfaces/flightPlan";
import "@/styles/flightPlanItem.css";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface FlightPlanProps {
  plan: FlightPlan;
  selected: boolean;
}

export default function FlightPlanItem({ plan, selected }: FlightPlanProps) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  return (
    <li ref={ref}>
      <Link
        className={clsx("fp-list-item", { "fp-list-item-selected": selected })}
        href={`/fp/${plan.id.toString()}`}
      >
        {plan.dep} - {plan.dest}
      </Link>
    </li>
  );
}
