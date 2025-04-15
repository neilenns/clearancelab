import FPE from "@/components/fpe";
import Sidebar from "@/components/sidebar";
import "@/styles/layout.css";

export default function Home() {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar />

      <main className="p-6 overflow-y-auto">
        <FPE />
      </main>
    </div>
  );
}
