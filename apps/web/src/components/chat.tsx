"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utilities";
import React from "react";

export interface ChatMessage {
  from: "controller" | "pilot";
  content: string | React.ReactNode;
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
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-2 py-2 text-sm",
                  message.from === "controller"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
