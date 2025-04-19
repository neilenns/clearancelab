import { Message } from "@/interfaces/message";
import clsx from "clsx";

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
      {messages.map((msg, idx) => {
        const isPilot = msg.from === "pilot";

        return (
          <div
            key={idx}
            className={clsx("flex mt-3 mb-3", {
              "justify-start": isPilot,
              "justify-end": !isPilot,
            })}
          >
            <div
              role="article"
              arial-label={`Message from ${
                isPilot ? pilotCallsign : controllerName
              }`}
              className={clsx(
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
              {msg.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
