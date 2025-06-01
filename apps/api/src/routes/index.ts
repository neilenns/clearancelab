import express from "express";

// Routes
import { ENV } from "@/lib/environment.js";
import path from "node:path";
import defaultRoutes from "./default.js";
import scenarioRoutes from "./scenarios/index.js";
import statisticsRoutes from "./statistics/index.js";
import vatsimRoutes from "./vatsim/index.js";

/**
 * Registers all application routes with the Express application.
 * @param app Express application instance
 */
export default function addRoutes(app: express.Express) {
  app.use(defaultRoutes);
  app.use("/scenarios", scenarioRoutes);
  app.use("/vatsim", vatsimRoutes);
  app.use("/statistics", statisticsRoutes);

  // Static audio files are only for local development use.
  if (ENV.NODE_ENV === "development") {
    app.use(express.static(path.join(process.cwd(), "public")));
  }
}
