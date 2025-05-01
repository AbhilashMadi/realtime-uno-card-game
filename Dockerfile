# ---------- STAGE 1: Build ----------
FROM node:22.14.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (dev + prod)
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the server and client
RUN npm run build:client
RUN npm run build:server

# ---------- STAGE 2: Production ----------
FROM node:22.14.0-alpine

# Create app directory and user
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the build output and necessary files
COPY --from=builder /app/build ./build
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

# Install only production dependencies
RUN npm ci --omit=dev

# Use non-root user
USER appuser

# Expose the app port (update if using different port)
EXPOSE 8080

# Start the app in production mode
CMD ["npm", "run", "start:prod"]
