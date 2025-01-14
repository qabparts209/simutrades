import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { testClient, setupTestData, cleanupTestData } from '../utils/test-client'
import { FormData } from 'formdata-node'
import WebSocket from 'ws'
import { settings } from '../../src/core/config'

describe('Data Flow', () => {
  let authToken: string

  beforeAll(async () => {
    await setupTestData()
    const response = await testClient.post('/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    })
    authToken = response.data.token
  })

  afterAll(async () => {
    await cleanupTestData()
  })

  it('handles file uploads', async () => {
    const formData = new FormData()
    formData.append('file', new Blob(['test content']), 'test.txt')

    const response = await testClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`
      }
    })
    expect(response.status).toBe(200)
    expect(response.data.fileUrl).toBeDefined()
  })

  it('processes payments', async () => {
    const paymentData = {
      amount: 100,
      currency: 'USD',
      paymentMethod: 'card',
      cardToken: 'test_token'
    }

    const response = await testClient.post('/api/payments', paymentData, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    expect(response.status).toBe(200)
    expect(response.data.transactionId).toBeDefined()
  })

  it('handles event broadcasting', async () => {
    const ws = new WebSocket(settings.WS_URL)
    
    await new Promise<void>((resolve) => {
      ws.on('open', () => {
        ws.send(JSON.stringify({ type: 'subscribe', channel: 'test' }))
      })

      ws.on('message', (data) => {
        const message = JSON.parse(data.toString())
        expect(message.type).toBe('subscribed')
        ws.close()
        resolve()
      })
    })
  })
}) 