import { Explanation, Scenario } from "@workspace/validators";
import { CalloutBox } from "../callout-box";

interface ExplanationsProperties {
  scenario?: Scenario;
}

interface ExplanationItemProperties {
  explanation: Explanation;
}

export function Explanations({ scenario }: ExplanationsProperties) {
  if (!scenario) {
    return;
  }

  return (
    <div role="region" aria-label="Clearance status and explanations">
      {scenario.canClear ? (
        <CalloutBox level="ok">You can issue the clearance!</CalloutBox>
      ) : (
        <CalloutBox level="warning">You cannot issue the clearance yet.</CalloutBox>
      )}

      <div className="mt-2" aria-label="Explanation details">
        {scenario.explanations.map((explanation, index) => (
          <ExplanationItem key={`explanation-${index.toString()}`} explanation={explanation} />
        ))}
      </div>
    </div>
  );
}

function ExplanationItem({ explanation }: ExplanationItemProperties) {
  return (
    <CalloutBox level={explanation.level}>
      <p
        className="flex items-start gap-2 font-bold"
        id={`explanation-headline-${explanation.headline.replaceAll(/\s+/g, "-").toLowerCase()}`}
      >
        {explanation.headline}
      </p>
      <p
        className="flex items-start gap-2"
        aria-labelledby={`explanation-headline-${explanation.headline
          .replaceAll(/\s+/g, "-")
          .toLowerCase()}`}
      >
        {explanation.description}
      </p>
    </CalloutBox>
  );
}
