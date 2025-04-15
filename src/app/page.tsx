import FPE from "@/components/fpe";
import "@/styles/layout.css";

export default function Home() {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <aside className="sidebar">
        <h2>Flight Plans</h2>
        <ul>
          <li>Flight 1</li>
          <li>Flight 2</li>
        </ul>
      </aside>

      <main className="p-6 overflow-y-auto">
        <FPE
          plan={{
            pilotName: "",
            aid: "ASA124",
            spd: 0,
            bcn: 0,
            cid: 0,
            typ: "",
            eq: "",
            dep: "",
            dest: "",
            alt: 0,
            rte: "",
            rmk: "",
          }}
        />
      </main>
    </div>
  );
}
