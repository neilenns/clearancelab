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
import { Edit, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <aside>
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
                        <item.icon />
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
            <div className="ml-auto">
              <Button variant="outline" size="icon" asChild>
                <a href="/auth/logout">
                  <LogOut />
                  <span className="sr-only">Log out</span>
                </a>
              </Button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
}
