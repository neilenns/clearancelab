"use client";

import { Answer } from "@/components/answer";
import FPE from "@/components/fpe/fpe";
import { FlowDirection, Scenario } from "@workspace/validators";
import { Info } from "lucide-react";

// cspell:disable
const scenario: Scenario = {
  airportConditions: {
    altimeter: 29.9,
    departureOnline: true,
    flow: FlowDirection.WEST,
  },
  canClear: true,
  craft: {
    altitude: "Climb via SID except maintain 7000",
    controllerName: "Portland Ground",
    frequency: 124.35,
    route: "LAVAA7 departure, Yakima transition, then as filed",
    telephony: "Alaska 223",
  },
  explanations: [
    {
      description:
        "Change the suffix to 'L' in the flight plan then clear the pilot as usual.",
      headline: "The equipment suffix 'X' is not appropriate for the A320.",
      level: "warning",
    },
  ],
  isValid: true,
  plan: {
    aid: "ASA223",
    alt: 350,
    bcn: 2000,
    cid: 585,
    dep: "KPDX",
    dest: "CYEG",
    eq: "X",
    homeAirport: "KPDX",
    pilotName: "Dakota",
    rte: "LAVAA7 YKM DCT YXC DCT MIREK/N0448F360 Q995 OILRS OILRS2",
    rmk: "RALT/KSFO PHTO SIMBRIEF/FIRST IFR FLIGHT/ VERY NEW TO VATSIM",
    spd: 200,
    typ: "A320",
    vatsimId: 1_400_467,
  },
  depAirportInfo: {
    airportCode: "KPDX",
    city: "Portland",
    countryCode: "US",
    iataCode: "PDX",
    icaoCode: "KPDX",
    latitude: 45.588_709,
    longitude: -122.596_869,
    name: "Portland International",
    state: "Oregon",
    timezone: "America/Los_Angeles",
  },
  destAirportInfo: {
    airportCode: "CYEG",
    countryCode: "CA",
    iataCode: "YEG",
    icaoCode: "CYEG",
    name: "Edmonton International",
    state: "Alberta",
    timezone: "America/Edmonton",
  },
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

      <h2>The Flight Plan Editor</h2>
      <p>
        Flight plans are shown using a Flight Plan Editor (FPE) that replicates
        the functionality in CRC. Airport conditions are shown below the FPE, to
        provide the additional information required to validate the plan and
        issue the clearance. Quick links to view the filed route on SkyVector
        and FlightAware are accessible via the tooltip on the <code>RTE</code>
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
        <kbd className="rounded border border-muted px-1.5 py-0.5 text-sm font-mono bg-muted text-muted-foreground">
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
      <h2>Tips</h2>
      <p>
        Press the{" "}
        <kbd className="rounded border border-muted px-1.5 py-0.5 text-sm font-mono bg-muted text-muted-foreground">
          S
        </kbd>{" "}
        key to show a random scenario. Press the{" "}
        <kbd className="rounded border border-muted px-1.5 py-0.5 text-sm font-mono bg-muted text-muted-foreground">
          A
        </kbd>{" "}
        key to show the answer.
      </p>
    </section>
  );
}
