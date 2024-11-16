// src/controllers/index.ts

import { Request, Response } from "express";
import { WeatherService } from "../services/WeatherService";
import { asyncHandler } from "../middlewares/async-handlers";
import { ApiError } from "../utils/api-error";
import { sendSuccess } from "../utils/response-helper";
import { WeatherQuery, CityQuery } from "../types/weather";

// Initialize the weather service instance
const weatherService = new WeatherService();

// Typing the request to make sure the query is typed for better autocomplete and type-checking
type TypedRequest<T> = Request<{}, any, any, T>;

/**
 * Controller to handle getting weather data (current weather, forecast, and air pollution).
 *
 * It validates the presence of latitude and longitude in the query, and fetches the data
 * from the weather service. The results are returned in a standardized success response.
 */
export const getWeatherData = asyncHandler(
	async (req: TypedRequest<WeatherQuery>, res: Response) => {
		const { lat, lon } = req.query;

		// Check if latitude and longitude are provided in the query
		if (!lat || !lon) {
			throw new ApiError(400, "Latitude and longitude are required");
		}

		// Fetch current weather, forecast, and air pollution data concurrently
		const [currentWeather, forecast, airPollution] = await Promise.all([
			weatherService.getCurrentWeather(parseFloat(lat), parseFloat(lon)),
			weatherService.getForecast(parseFloat(lat), parseFloat(lon)),
			weatherService.getAirPollution(parseFloat(lat), parseFloat(lon)),
		]);

		// Send the fetched data in a structured success response
		sendSuccess(res, {
			currentWeather,
			forecast,
			airPollution,
		});
	},
);

/**
 * Controller to handle searching for cities by a query string.
 *
 * It validates the presence of a query string ('q') and uses the weather service to
 * search for matching cities. The results are returned in a standardized success response.
 */
export const searchCities = asyncHandler(
	async (req: TypedRequest<CityQuery>, res: Response) => {
		const { q } = req.query;

		// Check if the search query is provided
		if (!q) {
			throw new ApiError(400, "Search query is required");
		}

		// Fetch matching cities based on the query string
		const cities = await weatherService.searchCities(q);

		// Send the list of cities in a structured success response
		sendSuccess(res, cities);
	},
);
