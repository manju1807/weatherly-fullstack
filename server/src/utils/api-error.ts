// src/utils/api-error.ts

// Custom Error class for API errors
export class ApiError extends Error {
	// Constructor for initializing an ApiError instance
	constructor(
		public statusCode: number, // HTTP status code for the error (e.g., 400, 500)
		message: string, // Error message to describe the issue
		public isOperational = true, // Flag to indicate if the error is operational or system-related (default is true)
	) {
		super(message); // Call the parent class (Error) constructor with the error message
		Error.captureStackTrace(this, this.constructor); // Capture the stack trace for better debugging
	}
}
