import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error: Error, _, response, __) => {
  console.error(error.stack);

  // Hide details in production
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : error.message;

  response.status(response.statusCode).json({
    success: false,
    status: response.statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export default errorHandler;
