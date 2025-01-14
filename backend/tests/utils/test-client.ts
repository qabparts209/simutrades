import axios from 'axios'

export const testClient = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000',
  validateStatus: () => true // Don't throw on any status
})

testClient.interceptors.request.use(config => {
  // Add auth token if needed
  const token = process.env.TEST_AUTH_TOKEN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const setupTestData = async () => {
  // Setup any test data needed
}

export const cleanupTestData = async () => {
  // Cleanup test data after tests
} 