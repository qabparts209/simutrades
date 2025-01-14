import { describe, it, expect } from 'vitest'
import { testClient } from '../utils/test-client'

describe('Error Handling', () => {
  it('handles API errors correctly', async () => {
    const response = await testClient.get('/api/non-existent')
    expect(response.status).toBe(404)
    expect(response.data.error).toBeDefined()
  })

  it('logs errors properly', async () => {
    // Test error logging
  })
}) 