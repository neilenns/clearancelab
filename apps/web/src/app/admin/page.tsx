import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex h-full flex-col items-center justify-center text-center px-4 py-16">
      <h3>Clearance Lab admin</h3>
      <p className="max-w-md">So much to admin.</p>
      <Button asChild>
        <Link href="/admin/scenarios/new">New Scenario</Link>
      </Button>
    </main>
  );
}
