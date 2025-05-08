import type { TransformableInfo } from "logform"; // logform is a Winston dep
import winston from "winston";
import { ENV } from "./environment.js";

const format =
  ENV.NODE_ENV === "production"
    ? winston.format.json()
    : winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info: TransformableInfo) => {
          const { timestamp, level, message } = info;
          let logMessage = message;
          const splat = info[Symbol.for("splat") as unknown as string];

          if (typeof message === "object" && message !== null) {
            logMessage = JSON.stringify(message);
          }

          if (Array.isArray(splat)) {
            const splatMessages = splat
              .map((item: unknown) => {
                if (typeof item === "object" && item !== null) {
                  return JSON.stringify(item);
                }
                return item;
              })
              .join(" ");
            logMessage = `${logMessage as string} ${splatMessages}`;
          }

          return `${timestamp?.toString() ?? ""} [${level.toUpperCase()}] ${logMessage as string}`;
        }),
      );

export const logger = winston.createLogger({
  level: ENV.LOG_LEVEL,
  format,
  transports: [new winston.transports.Console()],
});
