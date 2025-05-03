import { ErrorRequestHandler } from "express";
import { ENV } from "../lib/environment.js";

const errorHandler: ErrorRequestHandler = (
  error: Error,
  _request,
  response,
  _next,
) => {
  // See if it was a CORS failure
  if (error.message === "Not allowed by CORS") {
    response.status(403).json({
      success: false,
      status: 403,
      message:
        "CORS: Origin not allowed. Check the CORS whitelist for the server.",
    });

    return;
  }

  // Hide details in production
  const message =
    ENV.NODE_ENV === "production" ? "Internal Server Error" : error.message;

  // Ensure status code is an error code
  const statusCode =
    response.statusCode && response.statusCode >= 400
      ? response.statusCode
      : 500;

  response.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(ENV.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export default errorHandler;
