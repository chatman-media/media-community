import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { initRedis } from './infrastructure/cache/redis.js'
import { config } from './infrastructure/config/env.js'
import { initDatabase } from './infrastructure/database/postgres.js'

const app = express()

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.get('/api/v1', (_req, res) => {
  res.json({
    message: 'Chatman.media API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/v1',
    },
  })
})

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.isDevelopment ? err.message : 'Something went wrong',
  })
})

// Initialize and start server
async function startServer() {
  try {
    await initDatabase()
    await initRedis()

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`)
      console.log(`📝 Environment: ${config.nodeEnv}`)
      console.log(`🔗 Health check: http://localhost:${config.port}/health`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
