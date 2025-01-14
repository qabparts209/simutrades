import * as Sentry from '@sentry/nextjs'
import { env } from './src/config/env'

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  environment: env.NODE_ENV,
  tracesSampleRate: 1.0,
}) 