"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const friendlyNames: Record<string, string> = {
  admin: "Admin",
  scenarios: "Scenarios",
  edit: "Edit",
  new: "New",
};

const isLikelyId = (segment: string) => /^[a-f\d]{24}$/i.test(segment); // Mongo-style ObjectId

export function SiteHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const showNewButton = pathname === "/admin/scenarios";

  const lastIsId = isLikelyId(segments.at(-1) ?? "");
  const slicedSegments = lastIsId ? segments.slice(0, -1) : segments;

  const breadcrumbElements: React.ReactNode[] = [];

  for (const [index, segment] of slicedSegments.entries()) {
    const href = "/" + slicedSegments.slice(0, index + 1).join("/");
    const isLast = index === slicedSegments.length - 1;
    const label = friendlyNames[segment] ?? segment.replaceAll("-", " ");

    breadcrumbElements.push(
      <BreadcrumbItem key={href}>
        {isLast ? (
          <BreadcrumbLink aria-current="page">{label}</BreadcrumbLink>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={href}>{label}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>,
    );

    if (!isLast) {
      breadcrumbElements.push(<BreadcrumbSeparator key={`${href}-sep`} />);
    }
  }

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b px-4">
      <Breadcrumb>
        <BreadcrumbList>{breadcrumbElements}</BreadcrumbList>
      </Breadcrumb>
      {showNewButton && (
        <Button
          asChild
          size="icon"
          variant="ghost"
          aria-label="Create new scenario"
        >
          <Link href="/admin/scenarios/new">
            <CirclePlusIcon className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </header>
  );
}
