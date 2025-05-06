"use client";

import { SiteHeader } from "@/components/site-header";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div>
      <SiteHeader />
      <main
        className="flex min-h-screen flex-col items-center justify-center text-center px-4 py-4"
        aria-label="Loading scenarios"
      >
        <Spinner size="medium">
          <span>Loading scenarios...</span>
        </Spinner>
      </main>
    </div>
  );
}
