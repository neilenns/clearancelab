import Link from "next/link";
import { useEffect, useRef } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Scenario } from "@workspace/validators";

interface ScenarioItemProps {
  scenario: Scenario;
  selected: boolean;
}

export function ScenarioItem({ scenario, selected }: ScenarioItemProps) {
  const { plan } = scenario;

  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  if (!scenario._id) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={selected}>
        <Link
          aria-label={`View scenario for ${plan.aid}`}
          href={`/lab/${scenario._id.toString()}`}
        >
          {plan.dep} - {plan.dest} ({plan.aid})
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
