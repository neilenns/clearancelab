"use client";

import { AdminHeader } from "@/components/admin-header";
import { Loading } from "@/components/loading";

export default function LoadingPage() {
  return (
    <div>
      <AdminHeader />
      <main
        className="flex min-h-screen flex-col items-center justify-center text-center px-4 py-4"
        aria-label="Loading scenarios"
      >
        <Loading />
      </main>
    </div>
  );
}
