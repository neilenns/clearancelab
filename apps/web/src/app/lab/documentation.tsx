"use client";

import { AnswerWithAudio } from "@/components/answer-with-audio";
import FPE from "@/components/fpe/fpe";
import { Scenario } from "@workspace/validators";

// cspell:enable
export interface DocumentationProperties {
  sampleScenario?: Scenario;
}

export function Documentation({ sampleScenario }: DocumentationProperties) {
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
        practice fixing mistakes you identify when reviewing the plan. You can
        then compare your fixes to the issues shown in the answers section to
        see if you noticed all the necessary changes.
      </p>
      {sampleScenario && (
        <>
          <p>
            Try viewing the route on SkyVector and fixing the incorrect
            equipment suffix in the following plan:
          </p>
          <FPE scenario={sampleScenario} />
        </>
      )}
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
        Each answer explains any issues with the original flight plan. The
        answer also includes audio of the conversation with the pilot
        demonstrating the correct clearance phrasing, or conversation with the
        pilot if there are issues to resolve. The CRAFT components will be
        outlined below the audio.
      </p>
      {sampleScenario && (
        <>
          <p>
            Try revealing the answer to the scenario for flight plan shown
            above:
          </p>
          <AnswerWithAudio scenario={sampleScenario} className="mt-4" />
        </>
      )}
    </section>
  );
}
