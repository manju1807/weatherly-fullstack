# backend.Dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY server/ .

# Set build time arguments
ARG NODE_ENV=development
ARG PORT=5000
ARG CORS_ORIGINS=http://localhost:3000
ARG OPENWEATHER_API_KEY=16b48da87c0b488f8a9bd44a69b51d56
ARG BASE_URL=https://api.openweathermap.org/data/2.5
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

# Add build scripts in package.json
RUN npm pkg set scripts.build="tsc" \
    && npm pkg set scripts.start="node dist/server.js" \
    && npm pkg set scripts.dev="ts-node-dev --respawn --transpile-only src/server.ts" \
    && npm pkg set scripts.test="jest" \
    && npm pkg set scripts.lint="eslint . --ext .ts" \
    && npm pkg set scripts.format="prettier --write ."

# Install necessary dev dependencies for building
RUN npm install --save-dev typescript @types/node @types/express ts-node-dev jest @types/jest eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy built assets and package files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm install --production --omit=dev

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
CMD ["npm", "start"]