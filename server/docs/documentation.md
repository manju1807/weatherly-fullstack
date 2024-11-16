# Weatherly-Server - Weather API Service

## Overview

**Weatherly-Server** is a robust and highly scalable weather information API service built using Node.js, Express, TypeScript, and various other modern technologies. This application provides real-time weather data, forecasts, and air pollution details. It integrates with the OpenWeather API and features caching, rate-limiting, and validation mechanisms for optimal performance and reliability.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [System Architecture](#system-architecture)
4. [Installation Guide](#installation-guide)
5. [Configuration](#configuration)
6. [API Endpoints](#api-endpoints)
7. [Error Handling](#error-handling)
8. [Rate Limiting](#rate-limiting)
9. [Environment Variables](#environment-variables)
10. [Testing](#testing)
11. [Licenses](#licenses)
12. [Contributing](#contributing)

---

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **API Integration**: OpenWeather API
- **Cache**: In-memory caching via custom cache utility
- **Validation**: Zod for schema validation
- **Rate Limiting**: express-rate-limit
- **Logging**: Custom logger based on Winston
- **Security**: Basic headers and CORS
- **Error Handling**: Custom error handling with structured response
- **Type Safety**: TypeScript
- **Development Tools**: Biome, ESLint, Husky (optional), Prettier

---

## Features

- **Current Weather**: Retrieve the current weather information by latitude and longitude.
- **Weather Forecast**: Get weather forecasts for multiple days.
- **Air Pollution**: Get the air pollution index for the specified location.
- **City Search**: Search cities by name, return a list of matching cities based on population.
- **Caching**: Results from the OpenWeather API are cached for faster subsequent retrieval.
- **Rate Limiting**: Protects the API from abuse with rate-limiting mechanisms.
- **Error Handling**: Handles errors gracefully and provides detailed error messages.
- **Validation**: All incoming requests are validated using Zod schemas to ensure correct data.
- **Environment-based Configuration**: Configurable settings based on environment variables.

---

## System Architecture

The application follows a **three-tier architecture**:

1. **Client Tier**: User-facing interfaces (like frontend applications) make HTTP requests to the backend API.
2. **API Tier**: Express application serves as the API layer, processing requests, and communicating with the OpenWeather API.
3. **Data Layer**: The weather data and forecasts are retrieved from the OpenWeather API. Cached results are stored in memory for improved performance.

### Flow

1. **Client Request**: A client sends a request to the server (e.g., to get the current weather).
2. **Validation**: The incoming request is validated by middleware (Zod validation).
3. **Caching**: If data is available in the cache, it is served directly.
4. **API Call**: If the data is not cached, an API call is made to OpenWeather API.
5. **Rate Limiting**: The number of requests per client is limited to ensure fair usage.
6. **Response**: The server responds with the requested data or an error message.

---

## Installation Guide

### Prerequisites

Ensure that the following software is installed on your machine:

- Node.js (v18.x or later)
- npm or yarn
- Git

### Steps to Install

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/weatherly-server.git
    cd weatherly-server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file:

    ```plaintext
    PORT=5000
    NODE_ENV=development
    OPENWEATHER_API_KEY=your_openweather_api_key
    CACHE_TTL=1800000
    RATE_LIMIT_WINDOW_MS=900000
    RATE_LIMIT_MAX=100
    ```

4. Run the application in development mode:

    ```bash
    npm run dev
    ```

5. Open the API in your browser or use a tool like Postman to test the endpoints.

---

## Configuration

The application uses environment variables for configuration. These variables are required for setup:

- `PORT`: Port on which the server will run (default: `5000`).
- `NODE_ENV`: Environment mode (default: `development`).
- `OPENWEATHER_API_KEY`: OpenWeather API key for fetching weather data.
- `CACHE_TTL`: Time-to-live for cached data in milliseconds (default: `1800000` ms or 30 minutes).
- `RATE_LIMIT_WINDOW_MS`: Time window for rate limiting in milliseconds (default: `900000` ms or 15 minutes).
- `RATE_LIMIT_MAX`: Maximum number of requests allowed per IP address in the rate limit window (default: `100`).

---

## API Endpoints

### 1. **Get Current Weather**

- **Endpoint**: `/weather`
- **Method**: `GET`
- **Query Parameters**:

  - `lat` (required): Latitude of the location.
  - `lon` (required): Longitude of the location.

- **Response**:

    ```json
    {
      "success": true,
      "data": { /* Weather data */ }
    }
    ```

### 2. **Get Weather Forecast**

- **Endpoint**: `/forecast`
- **Method**: `GET`
- **Query Parameters**:

  - `lat` (required): Latitude of the location.
  - `lon` (required): Longitude of the location.

- **Response**:

    ```json
    {
      "success": true,
      "data": { /* Forecast data */ }
    }
    ```

### 3. **Get Air Pollution Data**

- **Endpoint**: `/air_pollution`
- **Method**: `GET`
- **Query Parameters**:

  - `lat` (required): Latitude of the location.
  - `lon` (required): Longitude of the location.

- **Response**:

    ```json
    {
      "success": true,
      "data": { /* Air pollution data */ }
    }
    ```

### 4. **Search Cities**

- **Endpoint**: `/find`
- **Method**: `GET`
- **Query Parameters**:

  - `q` (required): The search query (city name).

- **Response**:

  ```json
    {
      "success": true,
      "data": [/* List of matching cities */]
    }
    ```

---

## Error Handling

The application includes custom error handling to return structured error messages:

- **Validation Errors**: When data is invalid, a 400 status code is returned along with the validation error details.
- **API Errors**: If an error occurs when fetching data from the OpenWeather API, a 500 status code is returned with a generic error message.
- **Unknown Errors**: Any unexpected errors result in a 500 status code with a detailed error message.

---

## Rate Limiting

To prevent abuse, the application employs rate limiting using the `express-rate-limit` package. The rate limit is set as follows:

- **Window**: 15 minutes (`900000` ms)
- **Max Requests per IP**: 100 requests

Requests exceeding this limit will receive a 429 status code with the message: `Too many requests, please try again later.`

---

## Environment Variables

Refer to the `.env.example` file for the environment variables required for the application.

---

## Testing

The project does not have automated tests, but you can manually test the API using Postman or curl. Consider adding tests using tools like Jest or Mocha in the future.

---

## Licenses

This application is licensed under the MIT License. See [LICENSE](./LICENSE) for more details.

---

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure to follow best practices and write clean, well-documented code.

---

## Contact

For any questions or feedback, please reach out to me at [rmanjunath18@outlook.com].
