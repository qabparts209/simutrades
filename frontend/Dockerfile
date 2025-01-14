# Base image
FROM node:18-alpine

# Install system dependencies for WebGL
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    xvfb \
    mesa-dev \
    mesa-gl \
    mesa-dri-gallium \
    libx11-dev \
    libxext-dev \
    libxi-dev \
    libxrender-dev

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and missing packages
RUN npm install && \
    npm install @heroicons/react framer-motion recharts zod \
    eslint-config-prettier prettier @types/cypress

# Copy rest of the application
COPY . .

# Create missing files
RUN echo "" > src/app/globals.css

# Fix Cypress types
RUN echo "declare namespace Cypress { interface Chainable { login(): void } }" > cypress/support/index.d.ts

# Disable Sentry for build
ENV SENTRY_DISABLE=true
ENV NEXT_PUBLIC_SENTRY_DSN=""
ENV SENTRY_AUTH_TOKEN=""
ENV SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING=1

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 