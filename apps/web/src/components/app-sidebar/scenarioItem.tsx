import { ScenarioData } from "@/models/scenario";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface ScenarioItemProps {
  scenario: ScenarioData;
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

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={selected}>
        <Link href={`/lab/${scenario._id}`}>
          {plan.dep} - {plan.dest} ({plan.aid})
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
