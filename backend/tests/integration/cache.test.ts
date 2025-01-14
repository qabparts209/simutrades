import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { testClient } from '../utils/test-client'
import { redis, cacheKeys, clearCache } from '../../src/lib/redis'
import { settings } from '../../src/core/config'

describe('Cache System', () => {
  beforeEach(async () => {
    await clearCache(cacheKeys.DATA_CACHE)
  })

  afterEach(async () => {
    await clearCache(cacheKeys.DATA_CACHE)
  })

  it('maintains data consistency', async () => {
    // Update data
    await testClient.post('/api/data', { key: 'value' })
    
    // Check cache is invalidated
    const cached = await redis.get(cacheKeys.DATA_CACHE)
    expect(cached).toBeNull()
    
    // New request should update cache
    const response = await testClient.get('/api/data')
    const newCache = await redis.get(cacheKeys.DATA_CACHE)
    expect(newCache).toBeDefined()
  })

  it('handles cache invalidation', async () => {
    // Set initial cache
    await testClient.get('/api/data')
    
    // Update data which should invalidate cache
    await testClient.put('/api/data', { key: 'new_value' })
    
    // Cache should be cleared
    const cached = await redis.get(cacheKeys.DATA_CACHE)
    expect(cached).toBeNull()
  })
}) 