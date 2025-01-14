import { describe, it, expect } from 'vitest'
import { testClient } from '../utils/test-client'

describe('Performance Monitoring', () => {
  it('tracks response times', async () => {
    const start = performance.now()
    await testClient.get('/api/data')
    const duration = performance.now() - start
    
    expect(duration).toBeLessThan(1000) // Less than 1 second
  })

  it('monitors resource usage', async () => {
    const metrics = await testClient.get('/api/metrics')
    
    expect(metrics.data.memory).toBeDefined()
    expect(metrics.data.cpu).toBeDefined()
    expect(metrics.data.memory.used).toBeLessThan(metrics.data.memory.total)
  })

  it('detects bottlenecks', async () => {
    const response = await testClient.get('/api/performance/bottlenecks')
    
    expect(response.data.slowQueries).toBeDefined()
    expect(response.data.highLatencyEndpoints).toBeDefined()
  })
}) 