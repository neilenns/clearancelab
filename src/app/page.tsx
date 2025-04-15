"use client";

import { useState } from "react";
import FPE from "@/components/fpe";
import Sidebar from "@/components/sidebar";
import "@/styles/layout.css";
import { FlightPlan } from "@/interfaces/flightPlan";

export default function Home() {
  const [selectedFlightPlan, setSelectedFlightPlan] =
    useState<FlightPlan | null>(null);
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar onSelect={setSelectedFlightPlan} />

      <main className="p-6 overflow-y-auto">
        <FPE plan={selectedFlightPlan} />
      </main>
    </div>
  );
}
