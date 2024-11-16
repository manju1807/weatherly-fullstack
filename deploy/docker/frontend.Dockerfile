# frontend.Dockerfile

# .env.local
NEXT_PUBLIC_OPENWEATHER_API_KEY=16b48da87c0b488f8a9bd44a69b51d56
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1/weather

# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Copy package files
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY client/ .

# Set build time arguments
ARG NEXT_PUBLIC_OPENWEATHER_API_KEY=16b48da87c0b488f8a9bd44a69b51d56
ARG NEXT_PUBLIC_BASE_URL=http://localhost:3000
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1/weather

# Set environment variables for build
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=$NEXT_PUBLIC_OPENWEATHER_API_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Add build scripts in package.json
RUN npm pkg set scripts.dev="next dev" \
    && npm pkg set scripts.build="next build" \
    && npm pkg set scripts.start="next start" \
    && npm pkg set scripts.lint="next lint" \
    && npm pkg set scripts.format="prettier --write ." \
    && npm pkg set scripts.type-check="tsc --noEmit"

# Install necessary dev dependencies
RUN npm install --save-dev typescript @types/node @types/react @types/react-dom eslint eslint-config-next prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy built assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Install production dependencies only
RUN npm install --production --omit=dev

# Expose port
EXPOSE 3000

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=$NEXT_PUBLIC_OPENWEATHER_API_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Start the application
CMD ["npm", "start"]