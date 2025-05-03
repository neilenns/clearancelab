"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utilities";
import { Info } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export interface ChatMessage {
  from: "controller" | "pilot";
  content: string | React.ReactNode;
  onInfoClick?: () => void;
}

export interface ChatProperties {
  messages: ChatMessage[];
  pilotCallsign?: string;
  controllerName?: string;
}

export function Chat({ messages }: ChatProperties) {
  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message, index) => {
              const isController = message.from === "controller";

              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-2",
                    isController ? "justify-end" : "justify-start",
                  )}
                >
                  {isController && message.onInfoClick && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={message.onInfoClick}
                    >
                      <Info
                        className="self-center"
                        aria-label="Controller info"
                      />
                    </Button>
                  )}
                  <div
                    className={cn(
                      "w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                      isController
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
