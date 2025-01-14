import { describe, it, expect, beforeAll } from 'vitest'
import { testClient } from '../utils/test-client'

describe('API Accessibility', () => {
  let authToken: string

  beforeAll(async () => {
    const response = await testClient.post('/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    })
    authToken = response.data.token
  })

  it('verifies CORS configuration', async () => {
    const response = await testClient.options('/api/test')
    expect(response.headers['access-control-allow-origin']).toBeDefined()
    expect(response.headers['access-control-allow-methods']).toBeDefined()
  })

  it('checks authentication requirements', async () => {
    const response = await testClient.get('/api/protected')
    expect(response.status).toBe(401)
  })

  it('verifies authorization rules', async () => {
    const response = await testClient.get('/api/admin', {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    expect(response.status).toBe(403)
  })

  it('checks endpoint availability', async () => {
    const endpoints = ['/api/users', '/api/data', '/api/transactions']
    for (const endpoint of endpoints) {
      const response = await testClient.get(endpoint)
      expect(response.status).not.toBe(404)
    }
  })
}) 