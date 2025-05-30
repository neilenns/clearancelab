import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ScenarioSummary } from "@workspace/validators";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ScenarioItemProperties {
  scenario: ScenarioSummary;
  selected: boolean;
}

export function ScenarioItem({ scenario, selected }: ScenarioItemProperties) {
  const { plan } = scenario;

  const reference = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected && reference.current) {
      reference.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  if (!scenario._id) {
    return;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={selected}>
        <Link
          href={`/lab/${scenario._id.toString()}`}
          aria-label={`View scenario ${scenario.plan.dep ?? ""} to ${
            scenario.plan.dest ?? ""
          }, flight ${plan.aid}`}
        >
          {plan.dep} - {plan.dest} ({plan.aid})
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
