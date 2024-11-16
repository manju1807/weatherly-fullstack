// src/routes/weatherRoutes.ts

import express from "express";
import { getWeatherData, searchCities } from "../controllers"; // Import controller methods
import { validate } from "../middlewares/validation-middleware"; // Import validation middleware
import { weatherSchema, citySearchSchema } from "../validators/weather"; // Import validation schemas

const router = express.Router(); // Create a new express router

// Route to fetch weather data based on latitude and longitude
// The 'validate' middleware checks the query parameters against 'weatherSchema'
router.get("/data", validate(weatherSchema, "query"), getWeatherData);

// Route to search for cities based on a query
// The 'validate' middleware checks the query parameters against 'citySearchSchema'
router.get("/cities", validate(citySearchSchema, "query"), searchCities);

export default router; // Export the router for use in the main app
