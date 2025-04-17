import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScenarioData } from "@/models/scenario";
import Link from "next/link";

// Extend the props from the base Sidebar and add scenarios
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  scenarios: ScenarioData[];
}

export function AppSidebar({ scenarios, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h2>Flight plans</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {scenarios.map((scenario) => (
                <SidebarMenuItem key={scenario._id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/lab/${scenario._id}`}>
                      {scenario.plan.dep} - {scenario.plan.dest} (
                      {scenario.plan.aid})
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
