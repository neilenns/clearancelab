import React from "react";
import "@/styles/layout.css"; // if styles live there
import { FlightPlan } from "@/interfaces/flightPlan";
import FlightPlanItem from "@/components/flightPlanItem";

export default function Sidebar() {
  const plans = [
    {
      pilotName: "",
      aid: "ASA124",
      spd: 0,
      bcn: 0,
      cid: 0,
      typ: "",
      eq: "",
      dep: "KPDX",
      dest: "KSEA",
      alt: 0,
      rte: "",
      rmk: "",
    },
  ] as FlightPlan[];

  return (
    <aside className="sidebar">
      <h2>Flight Plans</h2>
      <ul>
        {plans.map((plan) => (
          <FlightPlanItem plan={plan} key={plan.aid} />
        ))}
      </ul>
    </aside>
  );
}
