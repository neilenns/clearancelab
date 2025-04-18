"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScenarioData } from "@/models/scenario";
import { ChevronsUpDown, CircleCheckBig, CircleX } from "lucide-react";
import { useState } from "react";
import { Conversation } from "@/components/conversation/conversation";
import { Craft } from "@/components/craft/craft";
import { Problems } from "@/components/problems";
import { Button } from "@/components/ui/button";

interface AnswerProps {
  scenario: ScenarioData;
}

export function Answer({ scenario }: AnswerProps) {
  const { plan, isValid, craft } = scenario;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[800px] bg-[var(--muted)]">
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
              <span className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-[var(--color-green-600)]" />
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
              <span className="flex items-center gap-2">
                <CircleX className="w-5 h-5 text-[var(--color-red-600)]" />
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
