import * as Sentry from '@sentry/nextjs'
import { BrowserTracing } from '@sentry/browser'
import { env } from '@/config/env'

export const initSentry = () => {
  if (!env.NEXT_PUBLIC_SENTRY_DSN) return

  Sentry.init({
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
    environment: env.NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [new BrowserTracing()],
    beforeSend(event) {
      if (env.NODE_ENV === 'development') {
        console.log('Sentry Event:', event)
      }
      return event
    }
  })
}

export const captureError = (error: Error, context?: Record<string, any>) => {
  console.error(error)
  Sentry.captureException(error, { extra: context })
} 