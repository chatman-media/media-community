import Redis from 'ioredis'
import { config } from '../config/env.js'

let redis: Redis | null = null

export async function initRedis() {
  try {
    redis = new Redis(config.redis.url, {
      maxRetriesPerRequest: 3,
      retryStrategy: times => {
        const delay = Math.min(times * 50, 2000)
        return delay
      },
    })

    redis.on('error', err => {
      console.error('Redis error:', err)
    })

    await redis.ping()
    console.log('✅ Redis connected')
  } catch (error) {
    console.error('❌ Redis connection failed:', error)
    throw error
  }
}

export function getRedis(): Redis {
  if (!redis) {
    throw new Error('Redis not initialized. Call initRedis() first.')
  }
  return redis
}

export async function closeRedis() {
  if (redis) {
    await redis.quit()
    redis = null
    console.log('✅ Redis connection closed')
  }
}
