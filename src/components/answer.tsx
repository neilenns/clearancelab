"use client";
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
import Craft from "./craft";
import Conversation from "./conversation";
import Problems from "./problems";
import { ScenarioData } from "@/models/scenario";

interface AnswerProps {
  scenario: ScenarioData;
}

export default function Answer({ scenario }: AnswerProps) {
  const { plan, isValid, craft } = scenario;

  return (
    <div className="answer-container">
      <Disclosure>
        {({ open }) => (
          <div>
            <DisclosureButton
              className="disclosure-button"
              aria-label={open ? "Hide answer" : "Show answer"}
            >
              <span>{open ? "Hide answer" : "Show answer"}</span>
              <ChevronDownIcon
                className={`chevron-icon ${open ? "open" : ""}`}
              />
            </DisclosureButton>

            <DisclosurePanel className="disclosure-panel">
              {isValid ? (
                <div>
                  <span className="valid-plan">
                    <CheckCircleIcon className="valid-icon" />
                    <span>The flight plan is good to go!</span>
                  </span>
                  <Conversation
                    pilotCallsign={plan.aid}
                    controllerName={craft?.controllerName ?? "Portland Ground"}
                    messages={[
                      {
                        from: "pilot",
                        content: `Portland Ground, ${
                          craft?.telephony ?? plan.aid
                        }, IFR to ${plan.dest}.`,
                      },
                      {
                        from: "controller",
                        content: <Craft scenario={scenario} />,
                      },
                    ]}
                  />
                </div>
              ) : (
                <div>
                  <span className="valid-plan">
                    <XCircleIcon className="invalid-icon" />
                    <span>The flight plan needs some cleanup.</span>
                  </span>
                </div>
              )}
              <Problems scenario={scenario} />
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
