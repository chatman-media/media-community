# syntax=docker/dockerfile:1

FROM oven/bun:1.3.1-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
COPY packages/config/package.json ./packages/config/
RUN bun install --frozen-lockfile --production

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN cd apps/api && bun run build

# Production image
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=2001

# Copy necessary files
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/packages ./packages
COPY --from=deps /app/node_modules ./node_modules

WORKDIR /app/apps/api

EXPOSE 2001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun run -e 'fetch("http://localhost:2001/health").then(r => r.ok ? process.exit(0) : process.exit(1))'

CMD ["bun", "run", "start"]
