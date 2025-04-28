import { Problem, Scenario } from "@workspace/validators";
import { CalloutBox } from "../callout-box";

interface ProblemsProps {
  scenario?: Scenario;
}

interface ProblemItemProps {
  problem: Problem;
}

export function Problems({ scenario }: ProblemsProps) {
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
