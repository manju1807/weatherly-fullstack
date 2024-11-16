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
ARG NODE_ENV
ARG PORT
ARG CORS_ORIGINS
ARG OPENWEATHER_API_KEY
ARG BASE_URL

# Set environment variables for build
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV CORS_ORIGINS=$CORS_ORIGINS
ENV OPENWEATHER_API_KEY=$OPENWEATHER_API_KEY
ENV BASE_URL=$BASE_URL

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
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["npm", "start"]
