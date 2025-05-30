import express from "express";
import errorHandler from "./error-handler.js";
import { requestLogger } from "./logging.js";

export default function applyMiddleware(app: express.Express) {
  app.use(express.json());
  app.use(requestLogger);

  // Always at the end.
  app.use(errorHandler);
}
