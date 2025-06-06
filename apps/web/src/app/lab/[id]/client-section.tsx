"use client";

import { incrementViews } from "@/api/scenarios/increment-views";
import { Answer } from "@/components/answer";
import { AnswerWithAudio } from "@/components/answer-with-audio";
import FPE from "@/components/fpe/fpe";
import { LabHeader } from "@/components/lab-header";
import { Scenario } from "@workspace/validators";
import { useEffect } from "react";

interface ClientSectionProperties {
  scenario: Scenario;
}

export default function ClientSection({ scenario }: ClientSectionProperties) {
  useEffect(() => {
    incrementViews(scenario._id).catch((error) => {
      console.error("Failed to increment views:", error);
    });
  }, [scenario._id]);

  return (
    <main className="overflow-y-auto">
      <LabHeader scenario={scenario} />
      <div className="p-4">
        <FPE scenario={scenario} />
        {scenario.hasAudio ? (
          <AnswerWithAudio scenario={scenario} />
        ) : (
          <Answer scenario={scenario} />
        )}
      </div>
    </main>
  );
}
