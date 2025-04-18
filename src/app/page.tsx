import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-xl space-y-6">
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Clearance Lab"
              width={64}
              height={64}
              priority
            />
            <span className="text-6xl font-semibold">Clearance Lab</span>
          </div>
        </div>
        <p className="text-muted-foreground text-lg">
          Where aspiring controllers sharpen their flight plan review skills.
        </p>
        <Button size="lg" asChild>
          <Link href="/lab">Launch the lab</Link>
        </Button>
      </div>
    </main>
  );
}
