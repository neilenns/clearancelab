"use client";
import { Audio } from "@/components/audio";
import { CraftTable } from "@/components/craft-table";
import { Explanations } from "@/components/explanations/explanations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { generateIssueBody, generateIssueTitle } from "@workspace/plantools";
import { Scenario } from "@workspace/validators";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useKey } from "react-use";

interface AnswerWithAudioProperties {
  scenario: Scenario;
  className?: string;
}

export function AnswerWithAudio({
  scenario,
  className,
}: AnswerWithAudioProperties) {
  const [isOpen, setIsOpen] = useState(false);

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
                <Audio className="mt-4" scenario={scenario} />
                <CraftTable className="mt-4" scenario={scenario} />
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
