"use client";

import { regeneratePages } from "@/api/scenarios/regenerate-page";
import { AdminHeader } from "@/components/admin-header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const handleRegenerate = () => {
  toast.promise(regeneratePages(), {
    loading: "Generating pages...",
    success: "Done!",
  });
};

export default function Page() {
  return (
    <div>
      <AdminHeader />
      <main className="flex h-full flex-col items-center justify-center text-center px-4 py-16">
        <h1>Clearance Lab admin</h1>
        <Button onClick={handleRegenerate}>Regenerate everything</Button>
      </main>
    </div>
  );
}
