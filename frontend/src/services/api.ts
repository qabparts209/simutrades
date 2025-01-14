import axios from 'axios'
import { config } from '@/config'

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiService = {
  // Auth
  signup: (data: any) => api.post('/auth/signup', data),
  login: (data: any) => api.post('/auth/login', data),
  
  // Trial
  createTrial: (data: any) => api.post('/trial/signup', data),
  
  // Newsletter
  subscribeNewsletter: (email: string) => api.post('/newsletter/subscribe', { email }),
  
  // Community
  joinCommunity: (data: any) => api.post('/community/join', data),
  
  // Educational Content
  getTutorials: () => api.get('/education/tutorials'),
  getStrategies: () => api.get('/education/strategies'),
  
  // Market Data
  getMarketData: (symbol: string) => api.get(`/market-data/${symbol}`),
  
  // User Settings
  updateSettings: (data: any) => api.put('/user/settings', data),
  
  // Support
  createSupportTicket: (data: any) => api.post('/support/ticket', data)
} 