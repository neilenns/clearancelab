import { FlightPlan } from "@/interfaces/flightPlan";

interface FlightPlanProps {
  plan: FlightPlan;
  onClick: () => void;
}

export default function FlightPlanItem({ plan, onClick }: FlightPlanProps) {
  return (
    <li className="hover:underline cursor-pointer" onClick={onClick}>
      {plan.dep} - {plan.dest}
    </li>
  );
}
