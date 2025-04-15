import { Message } from "@/interfaces/message";
import "@/styles/conversation.css";

export default function Conversation({
  pilotCallsign,
  controllerName,
  messages,
}: {
  pilotCallsign: string;
  controllerName: string;
  messages: Message[];
}) {
  return (
    <div>
      {messages.map((msg, idx) => {
        const isPilot = msg.from === "pilot";
        return (
          <div key={idx} className={`chat-row ${isPilot ? "left" : "right"}`}>
            <div className={`chat-bubble ${isPilot ? "pilot" : "controller"}`}>
              <div className="bubble">
                <div className="label">
                  {isPilot ? pilotCallsign : controllerName}
                </div>
                {msg.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
