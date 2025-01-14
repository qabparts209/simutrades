import { describe, it, expect } from 'vitest'
import WebSocket from 'ws'

describe('WebSocket Functionality', () => {
  it('handles reconnection', async () => {
    const ws = new WebSocket(`${process.env.WS_URL}/ws`)
    let reconnected = false

    ws.on('close', () => {
      // Attempt reconnection
      const newWs = new WebSocket(`${process.env.WS_URL}/ws`)
      newWs.on('open', () => {
        reconnected = true
        newWs.close()
      })
    })

    await new Promise<void>(resolve => {
      ws.on('open', () => {
        ws.close() // Force close to test reconnection
      })
      setTimeout(() => {
        expect(reconnected).toBe(true)
        resolve()
      }, 1000)
    })
  })
}) 