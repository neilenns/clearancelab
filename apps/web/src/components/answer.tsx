"use client";
import { Chat, ChatMessage } from "@/components/chat";
import { Craft } from "@/components/craft";
import { Explanations } from "@/components/explanations/explanations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getFormattedClearanceLimit, getTelephony } from "@workspace/plantools";
import { Scenario } from "@workspace/validators";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { useState } from "react";

interface AnswerProperties {
  scenario: Scenario;
}

export function Answer({ scenario }: AnswerProperties) {
  const { canClear } = scenario;
  const [isOpen, setIsOpen] = useState(false);

  const messages = [
    {
      alignment: "left",
      content: `Portland Ground, ${getTelephony(scenario)}, IFR to ${getFormattedClearanceLimit(scenario)}.`,
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
    <Card
      className="relative py-2 w-[800px] overflow-hidden"
      role="region"
      aria-label="Answer section"
    >
      <CardContent className="px-2">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="answer"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div id="answer-content" className="px-2 py-2 gap-0">
                <Explanations scenario={scenario} />
                {canClear && <Chat messages={messages} />}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="button"
              layout
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="flex justify-center px-4 py-4"
            >
              <Button
                aria-expanded={isOpen}
                aria-controls="answer-content"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Show answer
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
