import { z } from 'zod'

const envSchema = z.object({
  // Database
  POSTGRES_USER: z.string().default('postgres'),
  POSTGRES_PASSWORD: z.string().default('postgres'),
  POSTGRES_DB: z.string().default('simutrades'),
  POSTGRES_SERVER: z.string().default('localhost'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/simutrades'),

  // Redis
  REDIS_URL: z.string().default('redis://localhost:6379'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),

  // API
  API_URL: z.string().default('http://localhost:8000'),
  WS_URL: z.string().default('ws://localhost:8000'),

  // Sentry
  SENTRY_DSN: z.string().default(''),

  // S3
  BACKUP_BUCKET: z.string().default('simutrades-backups'),

  // Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

export const settings = {
  ...envSchema.parse(process.env),
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  REDIS_PORT_NUM: parseInt(process.env.REDIS_PORT || '6379', 10),
}

export type Settings = typeof settings 