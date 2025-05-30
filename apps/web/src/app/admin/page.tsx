"use client";

import { handleRegeneratePages } from "@/api/scenarios/regenerate-pages";
import { AdminHeader } from "@/components/admin-header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  return (
    <div>
      <AdminHeader />
      <main className="flex h-full flex-col items-center justify-center text-center px-4 py-16">
        <h1>Clearance Lab admin</h1>
        <p className="max-w-md">So much to admin.</p>
        <Button
          className="mt-2"
          onClick={() => {
            toast.promise(handleRegeneratePages(), {
              loading: "Generating pages...",
              success: "Done!",
              error: "Failed to generate pages",
            });
          }}
        >
          Regenerate pages
        </Button>
      </main>
    </div>
  );
}
