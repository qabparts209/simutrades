import { loadStripe, Stripe } from '@stripe/stripe-js'
import { env } from '@/config/env'

export class StripeService {
  private stripe: Stripe | null = null
  
  async initialize(): Promise<void> {
    this.stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_KEY)
    if (!this.stripe) throw new Error('Failed to initialize Stripe')
  }
  
  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<string> {
    const response = await fetch('/api/v1/payments/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency })
    })
    
    const { clientSecret } = await response.json()
    return clientSecret
  }
  
  async confirmPayment(clientSecret: string, paymentMethod: string): Promise<{ status: string }> {
    if (!this.stripe) throw new Error('Stripe not initialized')
    
    const { paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod
    })
    
    return { status: paymentIntent?.status || 'failed' }
  }
} 