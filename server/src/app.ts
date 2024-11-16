// src/app.ts

// Importing necessary modules and middlewares
import express, { Application } from "express"; // Express framework
import cors from "cors"; // CORS handling
import helmet from "helmet"; // Security headers
import compression from "compression"; // GZIP compression
import { rateLimiter } from "./middlewares/rate-limiter"; // Rate limiter middleware
import { errorHandler } from "./middlewares/error-handlers"; // Global error handler
import { ENV } from "./config/env"; // Environment variables
import logger from "./utils/logger"; // Logger utility
import routes from "./routes"; // API routes

// Create an Express application instance
const app: Application = express();

// Middleware setup

// Parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Middleware: Set HTTP headers for protection
app.use(helmet());

// Updated CORS configuration with more specific options
const corsOptions = {
  origin: ENV.CORS_ORIGINS === '*' 
    ? true 
    : ENV.CORS_ORIGINS.split(',').map(origin => origin.trim()),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// CORS configuration: Allow requests from specified origins
app.use(cors(corsOptions));

// Apply rate limiter to prevent abuse
app.use(rateLimiter);

// Compress response bodies for better performance
app.use(compression());

// Custom request logging middleware
app.use((req, res, next) => {
	logger.info(`${req.method} ${req.url}`); // Log the request method and URL
	next(); // Pass control to the next middleware
});

// Health check endpoint: Useful for load balancers and monitoring
app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() }); // Return a simple health status
});

// Define API routes
app.use("/api/v1/weather", routes); // Mount routes under the `/api/v1/weather` path

// Global error handling middleware: Captures unhandled errors
app.use(errorHandler);

export default app; // Export the configured app
