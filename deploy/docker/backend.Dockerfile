# Build stage
FROM --platform=linux/amd64 node:18-alpine AS builder
# Add platform-specific build configurations
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Use relative paths from the build context (which is the root directory)
COPY server/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the backend application
COPY server/ ./

# Set build time arguments
ARG NODE_ENV=development
ARG PORT=5001
ARG CORS_ORIGINS
ARG OPENWEATHER_API_KEY
ARG BASE_URL
ARG RATE_LIMIT_WINDOW_MS=900000
ARG RATE_LIMIT_MAX=100
ARG CACHE_TTL=1800000

# Set environment variables for build
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV CORS_ORIGINS=$CORS_ORIGINS
ENV OPENWEATHER_API_KEY=$OPENWEATHER_API_KEY
ENV BASE_URL=$BASE_URL
ENV RATE_LIMIT_WINDOW_MS=$RATE_LIMIT_WINDOW_MS
ENV RATE_LIMIT_MAX=$RATE_LIMIT_MAX
ENV CACHE_TTL=$CACHE_TTL

# Add TypeScript and build
RUN npm install --save-dev typescript @types/node @types/express
RUN npm run build

# Production stage
FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app

# Copy built assets and package files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --production --omit=dev

# Expose port
EXPOSE 5000

# Set runtime environment variables
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV CORS_ORIGINS=$CORS_ORIGINS
ENV OPENWEATHER_API_KEY=$OPENWEATHER_API_KEY
ENV BASE_URL=$BASE_URL
ENV RATE_LIMIT_WINDOW_MS=$RATE_LIMIT_WINDOW_MS
ENV RATE_LIMIT_MAX=$RATE_LIMIT_MAX
ENV CACHE_TTL=$CACHE_TTL

# Start the application
CMD ["npm", "start"]