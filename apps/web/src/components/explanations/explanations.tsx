import { Scenario } from "@workspace/validators";
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
