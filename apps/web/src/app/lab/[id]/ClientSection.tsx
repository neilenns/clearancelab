"use client";

import { useRef } from "react";
import FPE from "@/components/fpe/fpe";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import { Answer } from "@/components/answer";
import { Button } from "@/components/ui/button";
import { Scenario } from "@workspace/validators";

interface ClientSectionProps {
  scenario: Scenario;
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
        <Button
          aria-label="Copy screenshot"
          onClick={() => {
            handleScreenshot().catch(() => {
              toast.error("Failed to copy screenshot");
            });
          }}
        >
          Copy screenshot
        </Button>
      </div>
      <FPE scenario={scenario} ref={fpeRef} />
      <Answer scenario={scenario} />
    </main>
  );
}
