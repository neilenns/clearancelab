import express from "express";

// Routes
import defaultRoutes from "./default.js";
import scenarioRoutes from "./scenarios/index.js";
import statsRoutes from "./stats/index.js";
import vatsimRoutes from "./vatsim/index.js";

/**
 * Registers all application routes with the Express application.
 * @param app Express application instance
 */
export default function addRoutes(app: express.Express) {
  app.use(defaultRoutes);
  app.use("/scenarios", scenarioRoutes);
  app.use("/vatsim", vatsimRoutes);
  app.use("/stats", statsRoutes);
}
