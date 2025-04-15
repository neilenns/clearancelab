"use client";

import { useRef, useState } from "react";
import FPE from "@/components/fpe";
import Sidebar from "@/components/sidebar";
import { FlightPlan } from "@/interfaces/flightPlan";
import flightPlansData from "@/data/flightPlans.json" assert { type: "json" };
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";

export default function Home() {
  const [selectedFlightPlan, setSelectedFlightPlan] =
    useState<FlightPlan | null>(null);
  const fpeRef = useRef<HTMLDivElement>(null);

  const handleScreenshot = async () => {
    if (!fpeRef.current) return;

    const canvas = await html2canvas(fpeRef.current);
    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard
          .write([new ClipboardItem({ "image/png": blob })])
          .catch((err: unknown) => {
            toast.error("Failed to copy screenshot");
            console.error("Failed to copy screenshot: ", err);
          });
        toast.success("Screenshot copied to clipboard!");
      }
    });
  };

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar
        plans={flightPlansData}
        onSelect={setSelectedFlightPlan}
        selectedFlightPlan={selectedFlightPlan}
      />

      <main className="p-6 overflow-y-auto">
        <div className="mb-4">
          <button
            onClick={() => {
              handleScreenshot().catch(() => {
                toast.error("Failed to copy screenshot");
              });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Copy Screenshot
          </button>
        </div>
        <div>
          <FPE plan={selectedFlightPlan} ref={fpeRef} />
        </div>
      </main>
    </div>
  );
}
