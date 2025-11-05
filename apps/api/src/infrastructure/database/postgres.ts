import pg from 'pg'
import { config } from '../config/env.js'

const { Pool } = pg

let pool: pg.Pool | null = null

export async function initDatabase() {
  try {
    pool = new Pool({
      connectionString: config.database.url,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    await pool.query('SELECT NOW()')
    console.log('✅ PostgreSQL connected')
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error)
    throw error
  }
}

export function getDatabase(): pg.Pool {
  if (!pool) {
    throw new Error('Database not initialized. Call initDatabase() first.')
  }
  return pool
}

export async function closeDatabase() {
  if (pool) {
    await pool.end()
    pool = null
    console.log('✅ PostgreSQL connection closed')
  }
}
