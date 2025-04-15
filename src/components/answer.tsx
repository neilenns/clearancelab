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

interface AnswerProps {
  plan: FlightPlan;
}

export default function Answer({ plan }: AnswerProps) {
  return (
    <div className="w-[800px]">
      <Disclosure>
        {({ open }) => (
          <div>
            <DisclosureButton className="w-full flex items-center justify-between px-4 py-3 bg-neutral-700 text-white font-medium hover:bg-neutral-500 transition-colors">
              <span>{open ? "Hide answer" : "Show answer"}</span>
              <ChevronDownIcon
                className={`size-5 transform transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </DisclosureButton>

            <DisclosurePanel className="w-full bg-gray-200 px-4 py-3 text-gray-800">
              {plan.isValid ? (
                <span className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span>The flight plan is valid.</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <XCircleIcon className="w-5 h-5 text-red-600" />
                  <span>The flight plan has problems.</span>
                </span>
              )}
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
