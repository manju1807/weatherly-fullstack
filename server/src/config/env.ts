import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from a .env file into process.env
dotenv.config();

// Zod schema to validate and parse environment variables
const envSchema = z.object({
	// Server port, default to 5000 if not provided
	PORT: z.string().default("5000"),

	// Node environment, either 'development' or 'production'
	NODE_ENV: z.enum(["development", "production"]).default("development"),

	// API key for OpenWeather service (must be provided)
	OPENWEATHER_API_KEY: z.string(),

	// JWT Secret for authentication, optional (could be used for securing routes)
	JWT_SECRET: z.string().optional(),

	// CORS origins, specifies which domains can access the server (default: localhost)
	CORS_ORIGINS: z.string().default("*"),

	// Rate limit window in milliseconds (default: 15 minutes)
	RATE_LIMIT_WINDOW_MS: z.string().default("900000"),

	// Maximum number of requests allowed in the rate limit window (default: 100)
	RATE_LIMIT_MAX: z.string().default("100"),

	// Cache TTL (time-to-live) in milliseconds, how long data is kept in cache (default: 30 minutes)
	CACHE_TTL: z.string().default("1800000"),

	// Base URL for the OpenWeather API (default provided)
	BASE_URL: z.string().default("https://api.openweathermap.org/data/2.5"),
});

// Function to validate the environment variables using the schema
const validateEnv = (env: NodeJS.ProcessEnv) => {
	try {
		// Validate and parse the environment variables against the schema
		return envSchema.parse(env);
	} catch (error: any) {
		// Log error details and terminate if validation fails
		console.error("Invalid environment variables:", error.errors);
		process.exit(1);
	}
};

// Parse and validate environment variables and export the validated configuration
export const ENV = validateEnv(process.env) as z.infer<typeof envSchema>;
