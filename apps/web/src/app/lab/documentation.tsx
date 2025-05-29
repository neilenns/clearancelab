"use client";

import { Answer } from "@/components/answer";
import FPE from "@/components/fpe/fpe";
import { Scenario } from "@/db/scenarios";
import { FlowDirection } from "@workspace/validators";
import { Info } from "lucide-react";

// cspell:disable
const scenario: Scenario = {
  id: 1,
  airportConditions_altimeter: 29.9,
  airportConditions_departureOnline: true,
  airportConditions_flow: FlowDirection.WEST,
  canClear: true,
  craft_clearanceLimit: undefined,
  craft_altitude: "Climb via SID except maintain 7000",
  craft_controllerName: "Portland Ground",
  craft_frequency: 124.35,
  craft_route: "CASCD4 departure, then as filed",
  craft_telephony: "Alaska seventeen",
  explanations: [
    {
      id: 1,
      scenarioId: 1,
      order: 0,
      description:
        "Change the suffix to 'L' in the flight plan then clear the pilot as usual.",
      headline: "The equipment suffix 'X' is not appropriate for the A320.",
      level: "warning",
    },
  ],
  isValid: true,
  plan_aid: "ASA223",
  plan_alt: 350,
  plan_bcn: 2000,
  plan_cid: 585,
  plan_dep: "KPDX",
  plan_dest: "CYEG",
  plan_eq: "X",
  plan_homeAirport: "KPDX",
  plan_pilotName: "Dakota",
  plan_rte: "LAVAA7 YKM YXC MIREK/N0448F360 Q995 OILRS OILRS2",
  plan_rmk: "RALT/KSFO PHTO SIMBRIEF/FIRST IFR FLIGHT/ VERY NEW TO VATSIM",
  plan_spd: 200,
  plan_typ: "A320",
  plan_vatsimId: 1_400_467,
  depAirportInfo: {
    airportCode: "KPDX",
    name: "Portland International",
  },
  destAirportInfo: {
    airportCode: "CYEG",
    name: "Edmonton International",
  },
  views: 1,
};
// cspell:enable

export function Documentation() {
  return (
    <section
      aria-labelledby="documentation-title"
      className="[&>p]:leading-7 [&>p:not(:first-child)]:mt-6"
    >
      <h1 id="documentation-title">Welcome to Clearance Lab</h1>

      <p>
        This site helps you learn how to evaluate flight plans for correctness,
        then practice saying the flight plan clearance. Each scenario consists
        of a flight plan, shown in a Flight Plan Editor, and an answer that
        includes any corrections that may be required and the correct clearance
        phrasing.
      </p>
      <p>
        Select scenarios from the sidebar to practice, or use the random
        scenario button to show a random scenario from the list. You can also
        press the{" "}
        <kbd
          aria-keyshortcuts="S"
          className="rounded border border-muted px-1.5 py-0.5 text-sm font-mono bg-muted text-muted-foreground"
        >
          S
        </kbd>{" "}
        key to show a random scenario.
      </p>

      <h2>The Flight Plan Editor</h2>
      <p>
        Flight plans are shown using a Flight Plan Editor (FPE) that replicates
        the functionality in CRC. Airport conditions are shown below the FPE, to
        provide the additional information required to validate the plan and
        issue the clearance. Quick links to view the filed route on SkyVector
        and FlightAware are accessible via the tooltip on the <code>RTE</code>{" "}
        label.
      </p>
      <p>
        You can make edits to the values in the fields, just like in CRC, to
        practice fixing mistakes you identify when reviewing the plan.
      </p>
      <p>
        Try viewing the route on SkyVector and fixing the incorrect equipment
        suffix in the following plan:
      </p>
      <FPE scenario={scenario} />
      <h2>Answers</h2>
      <p>
        The scenario answer is revealed by clicking the <code>Show answer</code>{" "}
        button or by pressing the{" "}
        <kbd
          aria-keyshortcuts="A"
          className="rounded border border-muted px-1.5 py-0.5 text-sm font-mono bg-muted text-muted-foreground"
        >
          A
        </kbd>{" "}
        key.
      </p>
      <p>
        Each answer explains any issues with the flight plan, and whether the
        clearance can be issued. If the clearance can be issued, the answer
        includes an example conversation with the pilot demonstrating the
        correct clearance phrasing. To view each component of the CRAFT
        clearance use the{" "}
        <span className="inline-block align-text-bottom">
          <Info className="w-4 h-4" aria-label="Additional information" />
        </span>{" "}
        button next to the clearance.
      </p>
      <p>
        Try revealing the answer to the scenario for flight plan shown above:
      </p>
      <Answer scenario={scenario} className="mt-4" />
    </section>
  );
}
