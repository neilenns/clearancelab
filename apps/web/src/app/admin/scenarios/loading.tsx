"use client";

import { AdminHeader } from "@/components/admin-header";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div>
      <AdminHeader />
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
