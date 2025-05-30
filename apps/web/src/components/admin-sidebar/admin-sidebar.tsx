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
import { Edit, Home } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Manage scenarios",
    url: "/admin/scenarios",
    icon: Edit,
  },
];

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
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
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
