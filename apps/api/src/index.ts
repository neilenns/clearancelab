import express from "express";
import fs from "fs";
import http, { RequestListener } from "http";
import https from "https";
import path from "path";
import { connectToDatabase, disconnectFromDatabase } from "./db/connect.js";
import { ENV } from "./lib/env.js";
import applyMiddleware from "./middleware/index.js";
import addRoutes from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app = express();
const port = ENV.PORT;
let server: http.Server | https.Server;

// Graceful shutdown handling
function setupGracefulShutdown(server: http.Server) {
  const shutdown = () => {
    logger.info("Shutting down server...");

    server.close(() => {
      logger.info("HTTP server closed");
      disconnectFromDatabase().catch((err: unknown) =>
        logger.error("Error during DB disconnect", err)
      );
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

    setupGracefulShutdown(server);
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
}

void startServer();
