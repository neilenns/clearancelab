import { SiteHeader } from "@/components/site-header";

export default function Page() {
  return (
    <div>
      <SiteHeader title="Admin dashboard" />
      <main className="flex h-full flex-col items-center justify-center text-center px-4 py-16">
        <h3>Clearance Lab admin</h3>
        <p className="max-w-md">So much to admin.</p>
      </main>
    </div>
  );
}
