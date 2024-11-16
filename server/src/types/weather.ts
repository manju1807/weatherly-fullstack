// types/weather.ts

import { ParsedQs } from "qs"; // Importing ParsedQs for query string parsing

// Interface for latitude and longitude coordinates
export interface Coordinates {
	lat: number; // Latitude of the location
	lon: number; // Longitude of the location
}

// Default coordinates (New York City) for fallback or initial state
export const DEFAULT_COORDINATES: Coordinates = {
	lat: 40.712776,
	lon: -74.005974,
};

// Interface for parsing weather-related query parameters (latitude and longitude as strings)
export interface WeatherQuery extends ParsedQs {
	lat: string; // Latitude as a string (query param format)
	lon: string; // Longitude as a string (query param format)
}

// Interface for city search query parameters
export interface CityQuery extends ParsedQs {
	q: string; // Name of the city to search for
}

// Weather condition interface (e.g., clear sky, rain)
export interface WeatherCondition {
	id: number; // Unique identifier for the condition
	main: string; // Main weather condition (e.g., 'Clear', 'Rain')
	description: string; // Detailed description of the weather
	icon: string; // Icon representing the weather condition
}

// Main weather data interface (temperature, humidity, pressure, etc.)
export interface MainWeatherData {
	temp: number; // Current temperature
	feels_like: number; // Temperature perceived by the human body
	temp_min: number; // Minimum temperature
	temp_max: number; // Maximum temperature
	pressure: number; // Atmospheric pressure
	humidity: number; // Humidity percentage
	sea_level?: number; // Optional sea level pressure (if available)
	grnd_level?: number; // Optional ground level pressure (if available)
}

// Wind data interface (speed, direction, gusts)
export interface Wind {
	speed: number; // Wind speed
	deg: number; // Wind direction in degrees
	gust?: number; // Wind gust speed (optional)
}

// Clouds data interface
export interface Clouds {
	all: number; // Cloudiness percentage
}

// Rain data interface for hourly rain measurements
export interface Rain {
	"1h"?: number; // Rain volume in the last 1 hour (optional)
	"3h"?: number; // Rain volume in the last 3 hours (optional)
}

// Snow data interface for hourly snow measurements
export interface Snow {
	"1h"?: number; // Snow volume in the last 1 hour (optional)
	"3h"?: number; // Snow volume in the last 3 hours (optional)
}

// System data interface for additional weather information (e.g., sunrise, sunset)
export interface Sys {
	type?: number; // Type of system (optional)
	id?: number; // Unique ID for the system (optional)
	country: string; // Country code (e.g., 'US')
	sunrise: number; // Sunrise timestamp
	sunset: number; // Sunset timestamp
}

// Response format for current weather data
export interface CurrentWeatherResponse {
	coord: Coordinates; // Coordinates of the location
	weather: WeatherCondition[]; // Array of weather conditions
	base: string; // Weather data source
	main: MainWeatherData; // Main weather data (temperature, humidity, etc.)
	visibility: number; // Visibility in meters
	wind: Wind; // Wind data
	clouds: Clouds; // Cloudiness data
	rain?: Rain; // Optional rain data
	snow?: Snow; // Optional snow data
	dt: number; // Data timestamp
	sys: Sys; // System data (sunrise, sunset)
	timezone: number; // Timezone offset in seconds
	id: number; // Unique location ID
	name: string; // Location name
	cod: number; // HTTP status code for the request
}

// Forecast item data (for weather forecasts)
export interface ForecastItem {
	dt: number; // Timestamp of the forecast
	main: MainWeatherData; // Main weather data (temperature, humidity, etc.)
	weather: WeatherCondition[]; // Array of weather conditions
	clouds: Clouds; // Cloudiness data
	wind: Wind; // Wind data
	visibility: number; // Visibility in meters
	pop: number; // Probability of precipitation
	rain?: Rain; // Optional rain data
	snow?: Snow; // Optional snow data
	sys: { pod: string }; // Part of the day (e.g., day or night)
	dt_txt: string; // Date and time in ISO 8601 format
}

// Response format for weather forecasts
export interface ForecastResponse {
	cod: string; // Response code (e.g., '200')
	message: number; // Message code
	cnt: number; // Number of forecast items returned
	list: ForecastItem[]; // List of forecast items
	city: {
		// City information
		id: number;
		name: string;
		coord: Coordinates;
		country: string;
		population: number;
		timezone: number;
		sunrise: number;
		sunset: number;
	};
}

// Air pollution data interface (for air quality reports)
export interface AirPollutionData {
	dt: number; // Timestamp of the air pollution data
	main: { aqi: number }; // Air Quality Index (AQI)
	components: {
		// Air pollution components (CO, NO2, O3, etc.)
		co: number;
		no: number;
		no2: number;
		o3: number;
		so2: number;
		pm2_5: number; // PM2.5 concentration
		pm10: number; // PM10 concentration
		nh3: number; // Ammonia concentration
	};
}

// Response format for air pollution data
export interface AirPollutionResponse {
	coord: number[]; // Coordinates of the location
	list: AirPollutionData[]; // List of air pollution data
}

// Interface for representing a city with basic geographical data
export interface City {
	name: string; // City name
	country: string; // Country code (e.g., 'US')
	lat: number; // Latitude of the city
	lon: number; // Longitude of the city
}

// Complete weather data for a location, including current weather, forecast, and air pollution
export interface WeatherData {
	currentWeather: CurrentWeatherResponse; // Current weather data
	forecast: ForecastResponse; // Weather forecast data
	airPollution: AirPollutionResponse; // Air pollution data
}

// Temperature data in Celsius
export interface TemperatureMetric {
	temp: number; // Temperature in Celsius
	feels_like: number; // Perceived temperature in Celsius
	temp_min: number; // Minimum temperature in Celsius
	temp_max: number; // Maximum temperature in Celsius
}

// Temperature data in Fahrenheit
export interface TemperatureImperial {
	temp: number; // Temperature in Fahrenheit
	feels_like: number; // Perceived temperature in Fahrenheit
	temp_min: number; // Minimum temperature in Fahrenheit
	temp_max: number; // Maximum temperature in Fahrenheit
}

// Wind data in metric units (meters/sec)
export interface WindMetric {
	speed: number; // Wind speed in meters/sec
	deg: number; // Wind direction in degrees
	gust?: number; // Wind gust speed in meters/sec (optional)
}

// Wind data in imperial units (miles/hour)
export interface WindImperial {
	speed: number; // Wind speed in miles/hour
	deg: number; // Wind direction in degrees
	gust?: number; // Wind gust speed in miles/hour (optional)
}
