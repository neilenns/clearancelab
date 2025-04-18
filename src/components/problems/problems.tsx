import { ProblemData, ScenarioData } from "@/models/scenario";
import { CalloutBox } from "../callout-box";

interface ProblemsProps {
  scenario?: ScenarioData;
}

interface ProblemItemProps {
  problem: ProblemData;
}

export function Problems({ scenario }: ProblemsProps) {
  if (!scenario) {
    return null;
  }

  return (
    <div>
      {(scenario.problems.length === 0 || scenario.isValid) && (
        <CalloutBox level="ok">You can issue the clearance!</CalloutBox>
      )}

      <div className="mt-2">
        {scenario.problems.map((problem, idx) => (
          <ProblemItem key={`problem-${idx.toString()}`} problem={problem} />
        ))}
      </div>
    </div>
  );
}

function ProblemItem({ problem }: ProblemItemProps) {
  return (
    <CalloutBox level={problem.level}>
      <div className="flex items-start gap-2">
        <span className="font-semibold shrink-0 min-w-[60px] text-right">
          Issue:
        </span>
        <span>{problem.issue}</span>
      </div>
      <div className="flex items-start gap-2">
        <span className="font-semibold shrink-0 min-w-[60px] text-right">
          Solution:
        </span>
        <span>{problem.solution}</span>
      </div>
    </CalloutBox>
  );
}
