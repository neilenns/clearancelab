import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex h-full flex-col items-center justify-center text-center px-4 py-16">
      <h3>Scenario manager</h3>
      <Button asChild>
        <Link href="/admin/scenarios/new">New Scenario</Link>
      </Button>
    </main>
  );
}
