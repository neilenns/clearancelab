"use client";
import { Chat, ChatMessage } from "@/components/chat";
import { Craft } from "@/components/craft";
import { Explanations } from "@/components/explanations/explanations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  generateIssueBody,
  generateIssueTitle,
  getFormattedClearanceLimit,
  getTelephony,
} from "@workspace/plantools";
import { Scenario } from "@workspace/validators";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useKey } from "react-use";

interface AnswerProperties {
  scenario: Scenario;
  className?: string;
}

export function Answer({ scenario, className }: AnswerProperties) {
  const [isOpen, setIsOpen] = useState(false);

  const messages = [
    {
      alignment: "left",
      content: `${scenario.craft?.controllerName}, ${getTelephony(scenario)}. IFR to ${getFormattedClearanceLimit(scenario)}.`,
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
                  <TableCell>
                    {scenario.craft?.frequency?.toFixed(3) ?? "offline"}
                  </TableCell>
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

  useKey("a", () => {
    setIsOpen(true);
  });

  return (
    <Card
      className={cn("relative py-2 w-[800px] overflow-hidden", className)}
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
                <div>
                  <Chat messages={messages} />
                  {scenario.hasAudio && scenario.audioUrl && (
                    <div className="flex justify-center">
                      <audio
                        controls
                        className="w-1/2 pt-2"
                        aria-label="Play scenario audio"
                        aria-describedby="audio-description"
                      >
                        <source src={scenario.audioUrl} type="audio/mpeg" />
                        <p id="audio-description">
                          + Browser does not support audio playback.
                        </p>
                      </audio>
                    </div>
                  )}
                </div>
              </div>
              <CardFooter className="flex justify-center">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://github.com/neilenns/clearancelab/issues/new?labels=bug&title=${generateIssueTitle(scenario)}&body=${generateIssueBody(scenario)}`}
                  className="text-sm text-muted-foreground hover:underline"
                  aria-label="Report a mistake"
                >
                  Report a mistake
                </Link>
              </CardFooter>
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
