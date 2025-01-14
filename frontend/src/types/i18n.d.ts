import 'i18next'
import { resources } from '@/i18n/config'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: typeof resources
  }
} 