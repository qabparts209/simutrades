#!/bin/bash

# Create Next.js project with TypeScript
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# Install additional dependencies
npm install @reduxjs/toolkit react-redux @types/react-redux
npm install clsx class-variance-authority
npm install @sentry/nextjs
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom 