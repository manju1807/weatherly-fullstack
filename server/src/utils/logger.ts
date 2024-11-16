// src/utils/logger.ts

import { createLogger, format, transports } from "winston"; // Importing winston for logging

// Create a logger instance with specific configuration
const logger = createLogger({
	// Define the logging level (messages with level 'info' or higher will be logged)
	level: "info",

	// Define the log message format
	format: format.combine(
		// Add a timestamp to each log entry
		format.timestamp(),

		// Customize the log message format: timestamp, log level, and the message itself
		format.printf(
			({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`,
		),
	),

	// Define the transport for outputting logs
	transports: [
		// Output log messages to the console
		new transports.Console(),
	],
});

// Export the logger for use in other parts of the application
export default logger;
