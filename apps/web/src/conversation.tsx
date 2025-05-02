import { Message } from "@/interfaces/message";
import { cn } from "./lib/utilities";

export function Conversation({
  pilotCallsign,
  controllerName,
  messages,
}: {
  pilotCallsign: string;
  controllerName: string;
  messages: Message[];
}) {
  return (
    <div role="log" aria-label="Conversation">
      {messages.map((message, index) => {
        const isPilot = message.from === "pilot";

        return (
          <div
            key={index}
            className={cn("flex mt-3 mb-3", {
              "justify-start": isPilot,
              "justify-end": !isPilot,
            })}
          >
            <div
              role="article"
              aria-label={`Message from ${
                isPilot ? pilotCallsign : controllerName
              }`}
              className={cn(
                "max-w-[70%] px-4 py-3 rounded-[1em] leading-[1.4] break-words whitespace-pre-line",
                {
                  "bg-[var(--color-chat-pilot)] text-[var(--color-chat-pilot-foreground)] rounded-tl-none":
                    isPilot,
                  "bg-[var(--color-chat-controller)] text-[var(--color-chat-controller-foreground)] rounded-tr-none":
                    !isPilot,
                }
              )}
            >
              <div className="text-sm font-bold mb-1">
                {isPilot ? pilotCallsign : controllerName}
              </div>
              {message.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
