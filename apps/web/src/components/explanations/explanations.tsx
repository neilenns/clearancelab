import { Explanation, Scenario } from "@workspace/validators";
import { CalloutBox } from "../callout-box";

interface ExplanationsProperties {
  scenario?: Scenario;
}

interface ExplanationItemProps {
  explanation: Explanation;
}

export function Explanations({ scenario }: ExplanationsProperties) {
  if (!scenario) {
    return null;
  }

  return (
    <div>
      {scenario.canClear ? (
        <CalloutBox level="ok">You can issue the clearance!</CalloutBox>
      ) : (
        <CalloutBox level="warning">
          You cannot issue the clearance yet.
        </CalloutBox>
      )}

      <div className="mt-2">
        {scenario.explanations.map((explanation, index) => (
          <ExplanationItem key={`explanation-${index.toString()}`} explanation={explanation} />
        ))}
      </div>
    </div>
  );
}

function ExplanationItem({ explanation }: ExplanationItemProps) {
  return (
    <CalloutBox level={explanation.level}>
      <div className="flex items-start gap-2 font-bold">{explanation.headline}</div>
      <div className="flex items-start gap-2">{explanation.description}
      </div>
    </CalloutBox>
  );
}
