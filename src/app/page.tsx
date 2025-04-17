import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-xl space-y-6">
        <div className="flex justify-center">
          <Image
            src="/logo-text.svg"
            alt="Clearance Lab logo"
            width={320}
            height={320}
            priority
          />
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
