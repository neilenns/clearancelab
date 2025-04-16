import Scenario from "@/interfaces/scenario";
import "@/styles/flightPlanItem.css";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ScenarioItemProps {
  scenario: Scenario;
  selected: boolean;
}

export default function ScenarioItem({
  scenario,
  selected,
}: ScenarioItemProps) {
  const { plan } = scenario;

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
        href={`/fp/${scenario.id.toString()}`}
      >
        {plan.dep} - {plan.dest} ({plan.aid})
      </Link>
    </li>
  );
}
