// src/validators/weather.ts

import { z } from "zod"; // Import Zod for schema validation

// Schema for validating weather data with latitude and longitude
export const weatherSchema = z.object({
	// Latitude: transform string to float
	lat: z.string().transform((val) => parseFloat(val)),

	// Longitude: transform string to float
	lon: z.string().transform((val) => parseFloat(val)),
});

// Schema for validating city search input (query parameter)
export const citySearchSchema = z.object({
	// Query parameter 'q' for city search: must be a string between 1 and 100 characters
	q: z.string().min(1).max(100),
});
