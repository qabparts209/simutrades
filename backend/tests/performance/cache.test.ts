import { describe, it, expect } from 'vitest'
import { testClient } from '../utils/test-client'

describe('Cache Performance', () => {
  it('measures cache response times', async () => {
    const start = performance.now()
    const response = await testClient.get('/api/cached-data')
    const uncachedTime = performance.now() - start

    const cachedStart = performance.now()
    const cachedResponse = await testClient.get('/api/cached-data')
    const cachedTime = performance.now() - cachedStart

    expect(cachedTime).toBeLessThan(uncachedTime)
  })
}) 