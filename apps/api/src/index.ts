import cors from "cors";
import express from "express";
import fs from "node:fs";
import http, { RequestListener } from "node:http";
import https from "node:https";
import path from "node:path";
import { connectToDatabase, disconnectFromDatabase } from "./db/connect.js";
import { corsOptions, setWhitelist } from "./lib/cors.js";
import { ENV } from "./lib/environment.js";
import { logger } from "./lib/logger.js";
import applyMiddleware from "./middleware/index.js";
import { rateLimiter } from "./middleware/rate-limit.js";
import healthRoutes from "./routes/health/index.js";
import addRoutes from "./routes/index.js";

const app = express();
const healthApp = express();
const port = ENV.PORT;
const healthPort = ENV.HEALTH_PORT;
let server: http.Server | https.Server | undefined;
let healthServer: http.Server | undefined;

setWhitelist(ENV.WHITELISTED_DOMAINS);

// Graceful shutdown handling
function setupGracefulShutdown(
  mainServer: http.Server | https.Server | undefined,
  healthServer: http.Server | undefined,
) {
  const shutdown = () => {
    logger.info("Shutting down server...");

    healthServer?.close(() => {
      logger.info("Health server closed");

      mainServer?.close(() => {
        logger.info("Server closed");
        disconnectFromDatabase().catch((error: unknown) =>
          logger.error("Error during DB disconnect", error),
        );

        throw new Error("Server closed");
      });
    });

    mainServer?.close(() => {
      logger.info("Server closed");
      disconnectFromDatabase().catch((error: unknown) =>
        logger.error("Error during DB disconnect", error),
      );

      throw new Error("Server closed");
    });

    // Force close after timeout
    setTimeout(() => {
      logger.error("Forced shutdown after timeout");
      throw new Error("Server closed");
    }, 10_000);
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

    // Security
    app.use(cors(corsOptions));
    app.use(rateLimiter);

    healthApp.use("/health", healthRoutes);

    healthServer = http
      .createServer(healthApp as RequestListener)
      .setTimeout(5000)
      .listen(healthPort, () => {
        logger.info(
          `🌐 HTTP healthcheck listening on http://localhost:${healthPort.toString()}`,
        );
      });
  } catch (error) {
    logger.error("Error starting server:", error);
    throw new Error("Server closed");
  }
}

async function startServer() {
  try {
    await connectToDatabase();

    // Configuration
    app.set("trust proxy", ENV.TRUST_PROXY);

    // Security
    app.use(cors(corsOptions));
    app.use(rateLimiter);

    // Middleware and routes
    applyMiddleware(app);
    addRoutes(app);

    const keyPath = ENV.SSL_PRIVATE_KEY_PATH;
    const certPath = ENV.SSL_FULL_CHAIN_PATH;

    if (keyPath && certPath) {
      const sslOptions = {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        key: fs.readFileSync(path.resolve(keyPath)),
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        cert: fs.readFileSync(path.resolve(certPath)),
      };

      server = https
        .createServer(sslOptions, app as RequestListener)
        .listen(port, () => {
          logger.info(
            `🔒 HTTPS server listening on https://localhost:${port.toString()}`,
          );
        });
    } else {
      server = http.createServer(app as RequestListener).listen(port, () => {
        logger.info(
          `🌐 HTTP server listening on http://localhost:${port.toString()}`,
        );
      });
    }
  } catch (error) {
    logger.error("Error starting server:", error);
    throw new Error("Server closed");
  }
}

await startServer();

// Don't start the health server until the main server is up and running to
// avoid incorrect successful health result if the main server fails to start.
startHealthServer();

setupGracefulShutdown(server, healthServer);
