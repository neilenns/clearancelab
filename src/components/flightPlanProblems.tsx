import { FlightPlan } from "@/interfaces/flightPlan";

interface FlightPlanProblemsProps {
  plan?: FlightPlan;
}

export default function FlightPlanProblems({ plan }: FlightPlanProblemsProps) {
  if (!plan?.problems || plan.problems.length === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <p className="font-medium text-gray-800 mb-1">Things to double-check:</p>
      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
        {plan.problems.map((problem, idx) => (
          <li key={idx}>{problem}</li>
        ))}
      </ul>
    </div>
  );
}
