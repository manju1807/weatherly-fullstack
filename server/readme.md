# 🌤️ Weather API Server - Robust Weather Data Provider

**Weather API Server** is a high-performance, TypeScript-based Express server that provides comprehensive weather data through the OpenWeather API. Built with modern backend practices, it offers reliable, cached, and type-safe weather information.

## 🚀 Key Features

- 🌍 **Comprehensive Weather Data**
  - Real-time weather conditions
  - Detailed weather forecasts
  - Air pollution metrics
  - City search functionality

- 🛡️ **Robust Security**
  - Rate limiting protection
  - CORS configuration
  - Helmet security headers
  - Environment variable validation

- 🚄 **Performance Optimized**
  - In-memory caching system
  - Response compression
  - Efficient error handling
  - Request logging

- 📘 **Type Safety**
  - Full TypeScript implementation
  - Zod validation schemas
  - Comprehensive type definitions
  - Type-safe request handling

## 🛠️ Built With

- ⚡ **Express.js** - Fast, unopinionated web framework
- 📘 **TypeScript** - Type-safe JavaScript
- 🔐 **Helmet** - Security middleware
- 🌐 **Cors** - Cross-origin resource sharing
- 📦 **Compression** - Response compression
- ✅ **Zod** - Runtime type validation
- 🚦 **Express Rate Limit** - Rate limiting middleware
- 🪵 **Winston** - Logging library
- 🔄 **Axios** - HTTP client

## 🔌 API Endpoints

### Weather Data

```bash
GET /api/v1/weather/data
```

Query Parameters:

- `lat` (string): Latitude
- `lon` (string): Longitude

Returns:

- Current weather conditions
- Weather forecast
- Air pollution data

### City Search

```bash
GET /api/v1/weather/cities
```

Query Parameters:

- `q` (string): City name search query

Returns:

- List of matching cities with coordinates

### Health Check

```bash
GET /health
```

Returns:

- Server status
- Current timestamp

## 🏃‍♂️ Running the Project

1. 📥 Clone the repository:

```bash
git clone https://github.com/yourusername/weather-api-server.git
cd weather-api-server
```

2.📦 Set up environment variables: Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
OPENWEATHER_API_KEY=your_api_key_here
JWT_SECRET=your_secret_here
CORS_ORIGINS=http://localhost:5000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
CACHE_TTL=1800000
BASE_URL=https://api.openweathermap.org/data/2.5
```

3.📦 Install dependencies:

```bash
npm install
# or
yarn install
```

4.🚀 Start the server:

```bash
# Development
npm run dev
# or
yarn dev

# Production
npm start
# or
yarn start
```

## 🏗️ Architecture

### Key Components

1. **Configuration Layer**
   - Environment variable validation
   - Server configuration
   - Security settings

2. **Service Layer**
   - Weather service implementation
   - External API integration
   - Data transformation

3. **Controller Layer**
   - Request handling
   - Response formatting
   - Error management

4. **Middleware Layer**
   - Request validation
   - Error handling
   - Rate limiting
   - Security headers

5. **Utility Layer**
   - Caching system
   - Logging
   - Response helpers
   - Error classes

## 🔒 Security Features

- Rate limiting per IP
- Secure headers with Helmet
- CORS protection
- Environment variable validation
- Request validation
- Error sanitization

## 💾 Caching System

- In-memory caching with TTL
- Automatic cache invalidation
- Cache key generation
- Cache hit logging

## 📝 Error Handling

- Custom API error class
- Validation error handling
- Centralized error processing
- Development/Production error responses

## 🔍 Logging

- Request logging
- API call logging
- Error logging
- Winston implementation

## 📋 Prerequisites

- Node.js 14.x or higher
- OpenWeather API key
- npm or yarn package manager

## 📈 Performance Considerations

- Response compression
- In-memory caching
- Efficient error handling
- Type-safe operations

---

Created with ❤️ by [Your Name]
🌤️ Weather data provided by OpenWeather API
