"use client";
import { Chat, ChatMessage } from "@/components/chat";
import { Craft } from "@/components/craft/craft";
import { Explanations } from "@/components/explanations/explanations";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Scenario } from "@workspace/validators";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface AnswerProperties {
  scenario: Scenario;
}

export function Answer({ scenario }: AnswerProperties) {
  const { plan, canClear, craft } = scenario;
  const [isOpen, setIsOpen] = useState(false);

  const messages = [
    {
      from: "pilot",
      content: `Portland Ground, ${
        craft?.telephony ?? plan.aid
      }, IFR to ${plan.dest ?? ""}.`,
    },
    {
      from: "controller",
      content: <Craft scenario={scenario} />,
    },
  ] as ChatMessage[];

  return (
    <div className="w-[800px] bg-[var(--muted)]">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        aria-expanded={isOpen}
        aria-controls="answer-content"
      >
        <CollapsibleTrigger className="mb-1 mt-1" asChild>
          <Button variant="ghost">
            {isOpen ? "Hide answer" : "Show answer"}
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent id="answer-content" className="px-3 pb-3">
          <div>
            <Explanations scenario={scenario} />
            {canClear && (
              <Chat
                messages={messages}
                pilotCallsign={plan.aid}
                controllerName={craft?.controllerName ?? "Portland Ground"}
              />
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
