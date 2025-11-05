# syntax=docker/dockerfile:1

FROM oven/bun:1.3.1-alpine
WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV PORT=2001

# Copy package files
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
COPY packages/config/package.json ./packages/config/
COPY packages/ui/package.json ./packages/ui/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY apps/api/src ./apps/api/src
COPY apps/api/tsconfig.json ./apps/api/
COPY packages ./packages

WORKDIR /app/apps/api

EXPOSE 2001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun run -e 'fetch("http://localhost:2001/health").then(r => r.ok ? process.exit(0) : process.exit(1))'

# Run TypeScript directly with Bun
CMD ["bun", "run", "src/index.ts"]
