import { Scenario } from "@/db/scenarios";
import { CalloutBox } from "../callout-box";
import { ExplanationItem } from "./explanation-item";

interface ExplanationsProperties {
  scenario?: Scenario;
}

export function Explanations({ scenario }: ExplanationsProperties) {
  if (!scenario) {
    return;
  }

  return (
    <div role="region" aria-label="Clearance status and explanations">
      {scenario.canClear ? (
        <CalloutBox variant="ok" className="mb-2">
          You can issue the clearance!
        </CalloutBox>
      ) : (
        <CalloutBox variant="warning">
          You cannot issue the clearance yet.
        </CalloutBox>
      )}

      <div className="mt-2" aria-label="Explanation details">
        {scenario.explanations.map((explanation, index) => (
          <ExplanationItem
            key={`explanation-${index.toString()}`}
            explanation={explanation}
          />
        ))}
      </div>
    </div>
  );
}
