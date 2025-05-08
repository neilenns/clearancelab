import { AdminHeader } from "@/components/admin-header";

export default function Page() {
  return (
    <div>
      <AdminHeader />
      <main className="flex h-full flex-col items-center justify-center text-center px-4 py-16">
        <h1>Clearance Lab admin</h1>
        <p className="max-w-md">So much to admin.</p>
      </main>
    </div>
  );
}
