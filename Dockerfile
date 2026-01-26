# Improvisator Development Container
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install git (needed for some npm packages)
RUN apk add --no-cache git

# Copy package files first for better caching
COPY web/package*.json ./web/
COPY core/package*.json ./core/

# Install dependencies for each workspace
WORKDIR /app/core
RUN npm install

WORKDIR /app/web
RUN npm install

# Set working directory back to root
WORKDIR /app

# Expose Vite dev server port
EXPOSE 54321

# Default command: run the web dev server
CMD ["sh", "-c", "cd /app/web && npm run dev"]
