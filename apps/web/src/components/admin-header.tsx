"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon, LogOut } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const friendlyNames: Record<string, string> = {
  admin: "Admin",
  scenarios: "Scenarios",
  edit: "Edit",
  new: "New",
  statistics: "Plan statistics",
};

const isLikelyId = (segment: string) => /^[a-f\d]{24}$/i.test(segment); // Mongo-style ObjectId

export function AdminHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastIsId = isLikelyId(segments.at(-1) ?? "");
  const slicedSegments = lastIsId ? segments.slice(0, -1) : segments;

  const showNewButton = pathname === "/admin/scenarios";

  const pageName = useMemo(() => {
    return (
      friendlyNames[slicedSegments.at(-1) ?? ""] ??
      (slicedSegments.at(-1) ?? "").replaceAll("-", " ")
    );
  }, [slicedSegments]);

  const breadcrumbElements = useMemo(() => {
    const elements: React.ReactNode[] = [];

    for (const [index, segment] of slicedSegments.entries()) {
      const hrefPath = "/" + slicedSegments.slice(0, index + 1).join("/");
      const isLast = index === slicedSegments.length - 1;
      const label = friendlyNames[segment] ?? segment.replaceAll("-", " ");

      elements.push(
        <BreadcrumbItem key={hrefPath}>
          {isLast ? (
            <BreadcrumbLink aria-current="page">{label}</BreadcrumbLink>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={pathname as Route}>{label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>,
      );

      if (!isLast) {
        elements.push(<BreadcrumbSeparator key={`${hrefPath}-sep`} />);
      }
    }

    return elements;
  }, [slicedSegments]);

  return (
    <header
      className="flex h-12 shrink-0 items-center justify-between border-b px-4"
      role="banner"
      aria-label={`${pageName} page header`}
    >
      <Breadcrumb>
        <BreadcrumbList>{breadcrumbElements}</BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        {showNewButton && (
          <Button
            asChild
            size="icon"
            variant="outline"
            aria-label="Create new scenario"
          >
            <Link href="/admin/scenarios/new">
              <CirclePlusIcon className="h-4 w-4" />
            </Link>
          </Button>
        )}
        <Button variant="outline" size="icon" asChild>
          <a href="/auth/logout">
            <LogOut aria-hidden="true" />
            <span className="sr-only">Log out</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
