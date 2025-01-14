import { env } from '@/config/env'

type MessageHandler = (data: any) => void
type ConnectionHandler = () => void

export class WebSocketClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout = 1000
  private messageHandlers: Set<MessageHandler> = new Set()
  private connectionHandlers: Set<ConnectionHandler> = new Set()
  
  constructor(private url: string) {
    this.connect()
  }
  
  private connect() {
    this.ws = new WebSocket(this.url)
    
    this.ws.onopen = () => {
      this.reconnectAttempts = 0
      this.connectionHandlers.forEach(handler => handler())
    }
    
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.messageHandlers.forEach(handler => handler(data))
      } catch (error) {
        console.error('WebSocket message parse error:', error)
      }
    }
    
    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++
          this.connect()
        }, this.reconnectTimeout * this.reconnectAttempts)
      }
    }
  }
  
  onMessage(handler: MessageHandler) {
    this.messageHandlers.add(handler)
    return () => this.messageHandlers.delete(handler)
  }
  
  onConnect(handler: ConnectionHandler) {
    this.connectionHandlers.add(handler)
    return () => this.connectionHandlers.delete(handler)
  }
  
  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }
  
  close() {
    this.ws?.close()
  }
} 