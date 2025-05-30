import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SummaryScenario } from "@/db/scenarios";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ScenarioItemProperties {
  scenario: SummaryScenario;
  selected: boolean;
}

export function ScenarioItem({ scenario, selected }: ScenarioItemProperties) {
  const { id, plan_aid, plan_dep, plan_dest } = scenario;
  const reference = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected && reference.current) {
      reference.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  if (!scenario.id) {
    return;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={selected}>
        <Link
          href={`/lab/${id.toString()}`}
          aria-label={`View scenario ${scenario.plan_dep ?? ""} to ${
            scenario.plan_dest ?? ""
          }, flight ${plan_aid}`}
        >
          {plan_dep} - {plan_dest} ({plan_aid})
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
