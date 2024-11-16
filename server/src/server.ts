// src/server.ts

// Importing necessary modules and configurations
import app from "./app"; // Express application instance
import { ENV } from "./config/env"; // Environment variables
import logger from "./utils/logger"; // Logger utility for logging messages

// Start the server and listen on the specified port
const server = app.listen(ENV.PORT, () => {
	// Log a message once the server is up and running
	logger.info(
		`Server running on port: ${ENV.PORT} in ${ENV.NODE_ENV} mode`,
	);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
	// Log the error and gracefully shut down the server
	logger.error("Unhandled Rejection:", err);
	server.close(() => {
		// Exit the process with a failure status code (1)
		process.exit(1);
	});
});

// Handle termination signals (e.g., SIGTERM from Kubernetes)
process.on("SIGTERM", () => {
	// Log a message indicating the graceful shutdown process is starting
	logger.info("SIGTERM received. Graceful shutdown initiated...");

	// Close the server and terminate the process once closed
	server.close(() => {
		logger.info("Server closed. Process terminated.");
		process.exit(0); // Exit the process with a success status code (0)
	});
});
