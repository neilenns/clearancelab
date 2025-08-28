"use client";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartPie, Edit, Home, LucideIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

type NavItem<T extends string = string> = {
  href: T;
  title: string;
  icon: LucideIcon;
};

const items: ReadonlyArray<NavItem<Route>> = [
  {
    title: "Home",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Manage scenarios",
    href: "/admin/scenarios",
    icon: Edit,
  },
  {
    title: "View statistics",
    href: "/admin/statistics",
    icon: ChartPie,
  },
] as const satisfies ReadonlyArray<NavItem<Route>>;

export function AdminSidebar({ ...properties }) {
  return (
    <aside aria-label="Admin sidebar">
      <Sidebar {...properties}>
        <SidebarHeader>
          <h3>Admin</h3>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon aria-hidden="true" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center px-2">
            <ModeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
}
