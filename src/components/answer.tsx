"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScenarioData } from "@/models/scenario";
import "@/styles/answer.css"; // Import the CSS file
import { ChevronsUpDown, CircleCheckBig, CircleX } from "lucide-react";
import { useState } from "react";
import Conversation from "./conversation";
import Craft from "./craft";
import Problems from "./problems";
import { Button } from "./ui/button";

interface AnswerProps {
  scenario: ScenarioData;
}

export default function Answer({ scenario }: AnswerProps) {
  const { plan, isValid, craft } = scenario;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="answer-container">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="mb-1 mt-1" asChild>
          <Button variant="ghost">
            {isOpen ? "Hide answer" : "Show answer"}
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3">
          {isValid ? (
            <div>
              <span className="valid-plan">
                <CircleCheckBig className="valid-icon" />
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
                <CircleX className="invalid-icon" />
                <span>The flight plan needs some cleanup.</span>
              </span>
            </div>
          )}
          <Problems scenario={scenario} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
