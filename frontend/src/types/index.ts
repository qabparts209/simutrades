export interface User {
  id: string
  email: string
  isActive: boolean
  isSuperuser: boolean
}

export interface Subscription {
  id: string
  userId: string
  plan: 'free' | 'intermediate' | 'pro'
  expiresAt: string
}

export interface ChartLayout {
  id: string
  userId: string
  name: string
  layout: Record<string, unknown>
  isDefault: boolean
} 