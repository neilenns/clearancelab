"use client";

import { useState } from "react";
import FPE from "@/components/fpe";
import Sidebar from "@/components/sidebar";
import { FlightPlan } from "@/interfaces/flightPlan";
import flightPlansData from "@/data/flightPlans.json" assert { type: "json" };

export default function Home() {
  const [selectedFlightPlan, setSelectedFlightPlan] =
    useState<FlightPlan | null>(null);

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar
        plans={flightPlansData}
        onSelect={setSelectedFlightPlan}
        selectedFlightPlan={selectedFlightPlan}
      />

      <main className="p-6 overflow-y-auto">
        <FPE plan={selectedFlightPlan} />
      </main>
    </div>
  );
}
