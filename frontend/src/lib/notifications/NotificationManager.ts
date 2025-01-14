import { WebSocketClient } from '../websocket'

export type NotificationLevel = 'info' | 'warning' | 'error' | 'success'

export interface Notification {
  id: string
  level: NotificationLevel
  message: string
  timestamp: number
  read: boolean
}

export class NotificationManager {
  private static instance: NotificationManager
  private ws: WebSocketClient
  private notifications: Map<string, Notification> = new Map()
  private listeners: Set<(notifications: Notification[]) => void> = new Set()
  
  private constructor() {
    this.ws = new WebSocketClient('ws://localhost:8080/notifications')
    this.setupWebSocket()
  }
  
  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager()
    }
    return NotificationManager.instance
  }
  
  private setupWebSocket() {
    this.ws.onMessage((data) => {
      if (data.type === 'notification') {
        this.addNotification(data.notification)
      }
    })
    
    this.ws.onConnect(() => {
      this.syncNotifications()
    })
  }
  
  private addNotification(notification: Notification) {
    this.notifications.set(notification.id, notification)
    this.notifyListeners()
  }
  
  private notifyListeners() {
    const notifications = Array.from(this.notifications.values())
    this.listeners.forEach(listener => listener(notifications))
  }
  
  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.add(listener)
    listener(Array.from(this.notifications.values()))
    return () => this.listeners.delete(listener)
  }
  
  async markAsRead(notificationId: string) {
    const notification = this.notifications.get(notificationId)
    if (notification) {
      notification.read = true
      this.notifications.set(notificationId, notification)
      this.notifyListeners()
      
      await fetch(`/api/v1/notifications/${notificationId}/read`, {
        method: 'POST'
      })
    }
  }
  
  private async syncNotifications() {
    const response = await fetch('/api/v1/notifications')
    const notifications: Notification[] = await response.json()
    
    notifications.forEach(notification => {
      this.notifications.set(notification.id, notification)
    })
    
    this.notifyListeners()
  }
} 