import { describe, expect, it } from 'vitest'
import { z } from 'zod'

describe('Environment Configuration', () => {
  it('should validate required environment variables', () => {
    const envSchema = z.object({
      PORT: z.string().default('2001'),
      NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
      DATABASE_URL: z.string(),
      REDIS_URL: z.string(),
      JWT_SECRET: z.string(),
      JWT_EXPIRES_IN: z.string().default('7d'),
      CORS_ALLOWED_ORIGINS: z.string(),
    })

    const validEnv = {
      PORT: '2001',
      NODE_ENV: 'test' as const,
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
      REDIS_URL: 'redis://localhost:6379',
      JWT_SECRET: 'secret',
      JWT_EXPIRES_IN: '7d',
      CORS_ALLOWED_ORIGINS: 'http://localhost:3000',
    }

    const result = envSchema.safeParse(validEnv)
    expect(result.success).toBe(true)
  })

  it('should fail validation with missing required fields', () => {
    const envSchema = z.object({
      DATABASE_URL: z.string(),
      REDIS_URL: z.string(),
      JWT_SECRET: z.string(),
    })

    const invalidEnv = {
      DATABASE_URL: 'postgresql://localhost:5432/db',
      // Missing REDIS_URL and JWT_SECRET
    }

    const result = envSchema.safeParse(invalidEnv)
    expect(result.success).toBe(false)
  })

  it('should apply default values', () => {
    const envSchema = z.object({
      PORT: z.string().default('2001'),
      NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
      DATABASE_URL: z.string(),
      REDIS_URL: z.string(),
      JWT_SECRET: z.string(),
    })

    const minimalEnv = {
      DATABASE_URL: 'postgresql://localhost:5432/db',
      REDIS_URL: 'redis://localhost:6379',
      JWT_SECRET: 'secret',
    }

    const result = envSchema.parse(minimalEnv)
    expect(result.PORT).toBe('2001')
    expect(result.NODE_ENV).toBe('development')
  })
})
