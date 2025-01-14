declare module '@stripe/stripe-js' {
  export interface Stripe {
    confirmCardPayment(
      clientSecret: string,
      data?: any
    ): Promise<{ paymentIntent?: { status: string } }>
  }
  
  export function loadStripe(key: string): Promise<Stripe | null>
} 