import { describe, it, expect } from 'vitest'
import { testClient } from '../utils/test-client'

describe('API Contract Testing', () => {
  it('validates data types', async () => {
    const response = await testClient.get('/api/user/1')
    expect(typeof response.data.id).toBe('number')
    expect(typeof response.data.email).toBe('string')
  })

  it('handles loading states', async () => {
    const response = await testClient.get('/api/slow-endpoint')
    expect(response.headers['x-loading-state']).toBeDefined()
  })
}) 