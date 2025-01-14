import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.spec.ts',
    video: false,
    screenshotOnRunFailure: false,
    env: {
      TEST_USER_EMAIL: 'test@example.com',
      TEST_USER_PASSWORD: 'testpass123',
      coverage: false
    }
  },
  
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
}) 