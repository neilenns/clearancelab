import { FlightPlan } from "@/interfaces/flightPlan";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import "@/styles/answer.css"; // Import the CSS file
import FlightPlanProblems from "./flightPlanProblems";

interface AnswerProps {
  plan: FlightPlan;
}

export default function Answer({ plan }: AnswerProps) {
  return (
    <div className="answer-container">
      <Disclosure>
        {({ open }) => (
          <div>
            <DisclosureButton className="disclosure-button">
              <span>{open ? "Hide answer" : "Show answer"}</span>
              <ChevronDownIcon
                className={`chevron-icon ${open ? "open" : ""}`}
              />
            </DisclosureButton>

            <DisclosurePanel className="disclosure-panel">
              {plan.isValid ? (
                <span className="valid-plan">
                  <CheckCircleIcon className="valid-icon" />
                  <span>The flight plan is valid.</span>
                </span>
              ) : (
                <span className="valid-plan">
                  <XCircleIcon className="invalid-icon" />
                  <span>The flight plan has problems.</span>
                </span>
              )}
              <FlightPlanProblems plan={plan} />
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
