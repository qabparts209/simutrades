import { describe, it, expect, beforeAll } from 'vitest'
import { testClient } from '../utils/test-client'

describe('Auth0 Integration', () => {
  let adminToken: string

  beforeAll(async () => {
    // Get admin token
    const response = await testClient.post('/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    })
    adminToken = response.data.token
  })

  it('handles user authentication', async () => {
    const response = await testClient.post('/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    })
    expect(response.status).toBe(200)
    expect(response.data.token).toBeDefined()
  })

  it('enforces role-based access', async () => {
    const response = await testClient.get('/api/admin', {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
    expect(response.status).toBe(200)
  })

  it('validates security policies', async () => {
    // Test rate limiting
    const attempts = await Promise.all(
      Array(5).fill(0).map(() => testClient.post('/auth/login', {
        email: 'test@example.com',
        password: 'wrong'
      }))
    )
    expect(attempts[4].status).toBe(429) // Too many attempts
  })
}) 