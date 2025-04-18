"use client";

import { useRef } from "react";
import FPE from "@/components/fpe/fpe";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import Answer from "@/components/answer/answer";
import { ScenarioData } from "@/models/scenario";

interface ClientSectionProps {
  scenario: ScenarioData;
}

export default function ClientSection({ scenario }: ClientSectionProps) {
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
    <main className="p-6 overflow-y-auto">
      <div className="mb-4">
        <button
          aria-label="Copy flight plan as screenshot to clipboard"
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
        <FPE plan={scenario.plan} ref={fpeRef} />
      </div>
      <Answer scenario={scenario} />
    </main>
  );
}
