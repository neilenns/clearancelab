import FPE from "@/components/fpe";

export default function Home() {
  return (
    <main>
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
  );
}
