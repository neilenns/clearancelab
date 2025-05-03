"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utilities";
import React from "react";

export interface ChatMessage {
  alignment: "left" | "right";
  content: string | React.ReactNode;
  info?: React.ReactNode;
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
              const isRight = message.alignment === "right";

              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-2",
                    isRight ? "justify-end" : "justify-start",
                  )}
                >
                  {isRight && message.info}
                  <div
                    className={cn(
                      "w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                      isRight
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    {message.content}
                  </div>
                  {!isRight && message.info}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
