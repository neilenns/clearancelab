export type MessageSource = "pilot" | "controller";

export interface Message {
  from: MessageSource;
  content: React.ReactNode;
}
