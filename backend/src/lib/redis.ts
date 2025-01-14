import Redis from 'ioredis'
import { settings } from '../core/config'

export const redis = new Redis(settings.REDIS_URL)

export const cacheKeys = {
  DATA_CACHE: 'data_cache',
  USER_CACHE: 'user_cache'
} as const

export type CacheKey = typeof cacheKeys[keyof typeof cacheKeys]

export const clearCache = async (key: CacheKey) => {
  await redis.del(key)
}

export const getCache = async <T>(key: CacheKey): Promise<T | null> => {
  const data = await redis.get(key)
  return data ? JSON.parse(data) : null
}

export const setCache = async <T>(key: CacheKey, data: T, ttl?: number) => {
  const serialized = JSON.stringify(data)
  if (ttl) {
    await redis.setex(key, ttl, serialized)
  } else {
    await redis.set(key, serialized)
  }
} 