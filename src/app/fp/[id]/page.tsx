"use client";

import { useRef } from "react";
import FPE from "@/components/fpe";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { getFlightPlanById, normalizeFlightPlan } from "@/lib/flightPlanUtils";

export default function Home() {
  const fpeRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const selectedId = params.id as string;
  const selectedPlan = getFlightPlanById(selectedId);

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

  if (!selectedPlan) {
    return (
      <main className="p-6 flex flex-col items-center justify-center text-center text-gray-600">
        <h1 className="text-2xl font-semibold mb-2 text-red-600">
          Flight Plan Not Found
        </h1>
        <p className="mb-4 max-w-md">
          Sorry, we couldn&apos;t find a flight plan with ID{" "}
          <strong>{params.id}</strong>.
        </p>
        <p className="text-sm text-gray-400">
          Please select a valid plan from the sidebar.
        </p>
      </main>
    );
  }

  return (
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
        <FPE plan={normalizeFlightPlan(selectedPlan)} ref={fpeRef} />
      </div>
    </main>
  );
}
