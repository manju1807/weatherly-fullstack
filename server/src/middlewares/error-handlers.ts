// src/middlewares/error-handler.ts

import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { ZodError } from "zod"; // Import ZodError for validation errors
import { ApiError } from "../utils/api-error"; // Custom error class for API errors
import logger from "../utils/logger"; // Logger utility to log errors
import { ENV } from "../config/env"; // Environment variables

/**
 * Centralized error handler for the application.
 * It processes different types of errors and sends standardized error responses.
 *
 * @param err - The error that was thrown
 * @param req - Express request object
 * @param res - Express response object
 * @param next - The next function (used to pass control to the next middleware)
 */
export const errorHandler: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction, // Ensure this parameter is present for proper middleware chain
) => {
	// Log the error for debugging purposes
	logger.error(`Error: ${err.message}\nStack: ${err.stack}`);

	// If the error is a Zod validation error
	if (err instanceof ZodError) {
		// Format the Zod errors to a more readable structure
		const formattedErrors = err.errors.map((error) => ({
			path: error.path.join("."), // Convert path array to dot notation
			message: error.message, // Include the error message
		}));

		// Send a 400 Bad Request response with formatted validation errors
		res.status(400).json({
			success: false,
			error: "Validation Error", // General error name
			statusCode: 400,
			details: formattedErrors, // Include formatted error details
		});
		return; // Prevent further error handling
	}

	// If the error is an instance of the custom ApiError class
	if (err instanceof ApiError) {
		// Send the ApiError response with the statusCode and message
		res.status(err.statusCode).json({
			success: false,
			error: err.message, // The custom error message
			statusCode: err.statusCode,
			...(ENV.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace in development mode
		});
		return; // Prevent further error handling
	}

	// Default error handler for unexpected errors (e.g., server issues)
	const statusCode = 500; // Default to 500 Internal Server Error
	res.status(statusCode).json({
		success: false,
		error:
			ENV.NODE_ENV === "development" ? err.message : "Internal Server Error", // Show message or generic message based on environment
		statusCode,
		...(ENV.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace in development mode
	});
};
