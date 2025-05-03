"use client";
import { Chat, ChatMessage } from "@/components/chat";
import { Craft } from "@/components/craft";
import { Explanations } from "@/components/explanations/explanations";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getFormattedClearanceLimit } from "@workspace/plantools";
import { Scenario } from "@workspace/validators";
import { ChevronsUpDown, Info } from "lucide-react";
import { useState } from "react";

interface AnswerProperties {
  scenario: Scenario;
}

export function Answer({ scenario }: AnswerProperties) {
  const { plan, canClear, craft } = scenario;
  const [isOpen, setIsOpen] = useState(false);

  const messages = [
    {
      alignment: "left",
      content: `Portland Ground, ${
        craft?.telephony ?? plan.aid
      }, IFR to ${plan.dest ?? ""}.`,
    },
    {
      alignment: "right",
      content: <Craft scenario={scenario} />,
      info: (
        <Popover aria-label="Additional information">
          <PopoverTrigger asChild>
            <Button className="self-center" variant="ghost" size="icon">
              <Info aria-label="Display additional information" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-120" side="top">
            <Table aria-label="Craft clearance details">
              <TableBody>
                <TableRow key="C">
                  <TableCell>C</TableCell>
                  <TableCell>{getFormattedClearanceLimit(scenario)}</TableCell>
                </TableRow>
                <TableRow key="R">
                  <TableCell>R</TableCell>
                  <TableCell>{scenario.craft?.route}</TableCell>
                </TableRow>
                <TableRow key="A">
                  <TableCell>A</TableCell>
                  <TableCell>{scenario.craft?.altitude}</TableCell>
                </TableRow>
                <TableRow key="F">
                  <TableCell>F</TableCell>
                  <TableCell>{scenario.craft?.frequency}</TableCell>
                </TableRow>
                <TableRow key="T">
                  <TableCell>T</TableCell>
                  <TableCell>{scenario.plan.bcn}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </PopoverContent>
        </Popover>
      ),
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
            {canClear && <Chat messages={messages} />}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
