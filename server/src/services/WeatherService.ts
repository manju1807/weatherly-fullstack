// src/services/WeatherService.ts

import axios, { AxiosInstance } from "axios";
import { ENV } from "../config/env";
import { ApiError } from "../utils/api-error";
import logger from "../utils/logger";
import { Cache } from "../utils/cache";
import {
	CurrentWeatherResponse,
	ForecastResponse,
	AirPollutionResponse,
	City,
} from "../types/weather";

export class WeatherService {
	private axiosInstance: AxiosInstance; // Axios instance to make HTTP requests
	private cache: Cache; // Cache instance for storing API responses temporarily

	constructor() {
		// Initialize axios instance with base URL and timeout settings
		this.axiosInstance = axios.create({
			baseURL: ENV.BASE_URL,
			timeout: 10000, // Could be configured in the environment
		});

		// Initialize cache with TTL (time-to-live) set from environment
		this.cache = new Cache(parseInt(ENV.CACHE_TTL));

		// Intercept requests to log API requests
		this.axiosInstance.interceptors.request.use((config) => {
			logger.info(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
			return config;
		});

		// Intercept responses to handle API errors
		this.axiosInstance.interceptors.response.use(
			(response) => response,
			(error) => {
				// Enhanced error handling: check for different types of errors
				if (error.response) {
					// API error response (non-2xx status)
					logger.error(
						`API Error: ${error.response.status} - ${error.message}`,
					);
					throw new ApiError(
						error.response.status,
						error.response.data?.message || "External API error",
					);
				} else if (error.request) {
					// No response received (network error)
					logger.error(`No response received: ${error.message}`);
					throw new ApiError(500, "No response from API");
				} else {
					// Other errors (e.g., request setup issues)
					logger.error(`Error during request setup: ${error.message}`);
					throw new ApiError(500, "Error during API request setup");
				}
			},
		);
	}

	/**
	 * Generates a unique cache key for API responses based on the endpoint and parameters
	 * @param endpoint - The API endpoint being called
	 * @param params - The query parameters for the API request
	 * @returns A string representing the cache key
	 */
	private getCacheKey(endpoint: string, params: Record<string, any>): string {
		return `${endpoint}:${JSON.stringify(params)}`;
	}

	/**
	 * Fetches current weather data for a given latitude and longitude
	 * Caches the response to avoid unnecessary API calls
	 * @param lat - Latitude of the location
	 * @param lon - Longitude of the location
	 * @returns The current weather data
	 */
	async getCurrentWeather(
		lat: number,
		lon: number,
	): Promise<CurrentWeatherResponse> {
		const cacheKey = this.getCacheKey("weather", { lat, lon }); // Generate cache key
		const cachedData = this.cache.get<CurrentWeatherResponse>(cacheKey); // Check cache

		if (cachedData) {
			logger.info("Cache hit for current weather"); // Log cache hit
			return cachedData; // Return cached data
		}

		logger.info("Cache miss for current weather"); // Log cache miss
		const response = await this.axiosInstance.get<CurrentWeatherResponse>(
			"/weather",
			{
				params: {
					lat,
					lon,
					units: "metric", // Metric units (Celsius for temperature)
					appid: ENV.OPENWEATHER_API_KEY, // API key from environment
				},
			},
		);

		this.cache.set(cacheKey, response.data); // Store response in cache
		return response.data; // Return fresh data
	}

	/**
	 * Fetches weather forecast data for a given latitude and longitude
	 * Caches the response to avoid unnecessary API calls
	 * @param lat - Latitude of the location
	 * @param lon - Longitude of the location
	 * @returns The weather forecast data
	 */
	async getForecast(lat: number, lon: number): Promise<ForecastResponse> {
		const cacheKey = this.getCacheKey("forecast", { lat, lon }); // Generate cache key
		const cachedData = this.cache.get<ForecastResponse>(cacheKey); // Check cache

		if (cachedData) {
			logger.info("Cache hit for forecast"); // Log cache hit
			return cachedData; // Return cached data
		}

		logger.info("Cache miss for forecast"); // Log cache miss
		const response = await this.axiosInstance.get<ForecastResponse>(
			"/forecast",
			{
				params: {
					lat,
					lon,
					units: "metric", // Metric units (Celsius for temperature)
					appid: ENV.OPENWEATHER_API_KEY, // API key from environment
				},
			},
		);

		this.cache.set(cacheKey, response.data); // Store response in cache
		return response.data; // Return fresh data
	}

	/**
	 * Fetches air pollution data for a given latitude and longitude
	 * Caches the response to avoid unnecessary API calls
	 * @param lat - Latitude of the location
	 * @param lon - Longitude of the location
	 * @returns The air pollution data
	 */
	async getAirPollution(
		lat: number,
		lon: number,
	): Promise<AirPollutionResponse> {
		const cacheKey = this.getCacheKey("air_pollution", { lat, lon }); // Generate cache key
		const cachedData = this.cache.get<AirPollutionResponse>(cacheKey); // Check cache

		if (cachedData) {
			logger.info("Cache hit for air pollution"); // Log cache hit
			return cachedData; // Return cached data
		}

		logger.info("Cache miss for air pollution"); // Log cache miss
		const response = await this.axiosInstance.get<AirPollutionResponse>(
			"/air_pollution",
			{
				params: {
					lat,
					lon,
					appid: ENV.OPENWEATHER_API_KEY, // API key from environment
				},
			},
		);

		this.cache.set(cacheKey, response.data); // Store response in cache
		return response.data; // Return fresh data
	}

	/**
	 * Searches for cities based on a query string
	 * Caches the response to avoid unnecessary API calls
	 * @param query - The search query (e.g., city name)
	 * @returns A list of cities matching the search query
	 */
	async searchCities(query: string): Promise<City[]> {
		const cacheKey = this.getCacheKey("find", { q: query }); // Generate cache key
		const cachedData = this.cache.get<City[]>(cacheKey); // Check cache

		if (cachedData) {
			logger.info("Cache hit for city search"); // Log cache hit
			return cachedData; // Return cached data
		}

		logger.info("Cache miss for city search"); // Log cache miss
		const response = await this.axiosInstance.get("/find", {
			params: {
				q: query, // Query string (e.g., city name)
				type: "like", // Type of search ('like' for fuzzy matching)
				sort: "population", // Sort cities by population
				cnt: 5, // Limit to 5 results
				appid: ENV.OPENWEATHER_API_KEY, // API key from environment
			},
		});

		// Map the response to the City type
		const cities = response.data.list.map((city: any) => ({
			name: city.name,
			country: city.sys.country,
			lat: city.coord.lat,
			lon: city.coord.lon,
		}));

		this.cache.set(cacheKey, cities); // Store response in cache
		return cities; // Return the list of cities
	}
}
