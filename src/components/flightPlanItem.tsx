import { FlightPlan } from "@/interfaces/flightPlan";

interface FlightPlanProps {
  plan: FlightPlan;
}

export default function FlightPlanItem({ plan }: FlightPlanProps) {
  return (
    <li className="hover:underline cursor-pointer">
      {plan.dep} - {plan.dest}
    </li>
  );
}
