import io from 'socket.io-client'
import { config } from '@/config'

class WebSocketService {
  private socket: any
  private subscribers: Map<string, Function[]>

  constructor() {
    this.socket = io(config.WS_URL)
    this.subscribers = new Map()

    this.socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    this.socket.on('message', (data: any) => {
      this.notifySubscribers('message', data)
    })
  }

  subscribe(event: string, callback: Function) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, [])
    }
    this.subscribers.get(event)?.push(callback)
  }

  unsubscribe(event: string, callback: Function) {
    const callbacks = this.subscribers.get(event) || []
    const index = callbacks.indexOf(callback)
    if (index > -1) {
      callbacks.splice(index, 1)
    }
  }

  private notifySubscribers(event: string, data: any) {
    const callbacks = this.subscribers.get(event) || []
    callbacks.forEach(callback => callback(data))
  }

  disconnect() {
    this.socket.disconnect()
  }
}

export const wsService = new WebSocketService() 