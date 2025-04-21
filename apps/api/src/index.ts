import express from "express";
import fs from "fs";
import http, { RequestListener } from "http";
import https from "https";
import path from "path";
import { connectToDatabase, disconnectFromDatabase } from "./db/connect.js";
import { ENV } from "./lib/env.js";
import { logger } from "./lib/logger.js";
import applyMiddleware from "./middleware/index.js";
import healthRoutes from "./routes/health.js";
import addRoutes from "./routes/index.js";

const app = express();
const healthApp = express();
const port = ENV.PORT;
const healthPort = ENV.HEALTH_PORT;
let server: http.Server | https.Server;
let healthServer: http.Server;

// Graceful shutdown handling
function setupGracefulShutdown(
  mainServer: http.Server | https.Server,
  healthServer: http.Server
) {
  const shutdown = () => {
    logger.info("Shutting down server...");

    healthServer.close(() => {
      logger.info("Health server closed");
    });

    mainServer.close(() => {
      logger.info("Server closed");
      disconnectFromDatabase().catch((err: unknown) =>
        logger.error("Error during DB disconnect", err)
      );

      process.exit(0);
    });

    // Force close after timeout
    setTimeout(() => {
      logger.error("Forced shutdown after timeout");
      process.exit(1);
    }, 10000);
  };

  // Listen for termination signals
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

logger.info(`Starting backend ${ENV.VERSION}`);

function startHealthServer() {
  try {
    // Configuration
    healthApp.set("trust proxy", ENV.TRUST_PROXY);
    healthApp.use("/health", healthRoutes);

    healthServer = http
      .createServer(healthApp as RequestListener)
      .setTimeout(5000)
      .listen(healthPort, () => {
        logger.info(
          `🌐 HTTP healthcheck listening on http://localhost:${healthPort.toString()}`
        );
      });
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDatabase();

    // Configuration
    app.set("trust proxy", ENV.TRUST_PROXY);

    applyMiddleware(app);
    addRoutes(app);

    const keyPath = ENV.SSL_PRIVATE_KEY_PATH;
    const certPath = ENV.SSL_FULL_CHAIN_PATH;

    if (keyPath && certPath) {
      const sslOptions = {
        key: fs.readFileSync(path.resolve(keyPath)),
        cert: fs.readFileSync(path.resolve(certPath)),
      };

      server = https
        .createServer(sslOptions, app as RequestListener)
        .listen(port, () => {
          logger.info(
            `🔒 HTTPS server listening on https://localhost:${port.toString()}`
          );
        });
    } else {
      server = http.createServer(app as RequestListener).listen(port, () => {
        logger.info(
          `🌐 HTTP server listening on http://localhost:${port.toString()}`
        );
      });
    }

    setupGracefulShutdown(server, healthServer);
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
}

void startServer().then(() => {
  // Don't start the health server until the main server is up and running to
  // avoid incorrect successful health result if the main server fails to start.
  startHealthServer();
});
