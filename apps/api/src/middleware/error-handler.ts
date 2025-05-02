import { ErrorRequestHandler } from "express";
import { ENV } from "../lib/environment.js";

const errorHandler: ErrorRequestHandler = (error: Error, _request, response, _next) => {
  console.error(error.stack);

  // Hide details in production
  const message = ENV.NODE_ENV === "production" ? "Internal Server Error" : error.message;

  // Ensure status code is an error code
  const statusCode = response.statusCode && response.statusCode >= 400 ? response.statusCode : 500;

  response.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(ENV.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export default errorHandler;
