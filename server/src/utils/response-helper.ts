// src/utils/response.ts

import { Response } from "express"; // Importing the Response type from Express

// Interface for a standardized success response
interface SuccessResponse {
	success: true; // Indicates success
	data: any; // Data to be returned in the response
	message?: string; // Optional success message
}

// Interface for a standardized error response
interface ErrorResponse {
	success: false; // Indicates failure
	error: string; // Error message to describe the failure
	statusCode: number; // HTTP status code for the error
	details?: any; // Optional additional details about the error
}

/**
 * Send a standardized success response
 * @param res - Express response object
 * @param data - Data to send in the response
 * @param message - Optional success message (default is 'Success')
 * @param statusCode - HTTP status code (default is 200)
 */
export const sendSuccess = (
	res: Response,
	data: any,
	message = "Success",
	statusCode = 200,
) => {
	// Create the success response object
	const response: SuccessResponse = {
		success: true,
		data,
		message,
	};

	// Send the response with the appropriate status code
	res.status(statusCode).json(response);
};

/**
 * Send a standardized error response
 * @param res - Express response object
 * @param error - Error message to send in the response
 * @param statusCode - HTTP status code (default is 500)
 * @param details - Optional additional details about the error
 */
export const sendError = (
	res: Response,
	error: string,
	statusCode = 500,
	details?: any,
) => {
	// Create the error response object
	const response: ErrorResponse = {
		success: false,
		error,
		statusCode,
		details,
	};

	// Send the error response with the appropriate status code
	res.status(statusCode).json(response);
};
