import { describe, it, expect } from 'vitest'
import { testClient } from '../utils/test-client'

describe('Error Handling', () => {
  it('handles client-side errors', async () => {
    const response = await testClient.post('/api/data', {
      invalidData: true
    })
    expect(response.status).toBe(400)
    expect(response.data.error).toBeDefined()
  })

  it('logs server errors', async () => {
    const response = await testClient.get('/api/trigger-error')
    expect(response.status).toBe(500)
    
    // Check error was logged
    const logs = await testClient.get('/api/logs')
    expect(logs.data.some((log: any) => log.level === 'error')).toBe(true)
  })

  it('reports errors to monitoring', async () => {
    const response = await testClient.get('/api/trigger-error')
    
    // Check Sentry received the error
    const sentryResponse = await testClient.get('/api/sentry/latest')
    expect(sentryResponse.data.event_id).toBeDefined()
  })
}) 