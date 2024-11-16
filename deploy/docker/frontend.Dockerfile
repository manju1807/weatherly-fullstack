# Build stage
FROM --platform=linux/amd64 node:18-alpine AS builder
# Add platform-specific build configurations
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Use relative paths from the build context (which is the root directory)
COPY client/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the frontend application
COPY client/ ./

# Set build time arguments
ARG NEXT_PUBLIC_OPENWEATHER_API_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL

# Set environment variables for build
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=$NEXT_PUBLIC_OPENWEATHER_API_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Build the application
RUN npm run build

# Production stage
FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app

# Copy built assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Install production dependencies only
RUN npm ci --production --omit=dev

# Expose port
EXPOSE 3000

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=$NEXT_PUBLIC_OPENWEATHER_API_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Start the application
CMD ["npm", "start"]