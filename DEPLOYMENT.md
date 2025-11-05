# Инструкция по деплою Chatman.media

## 🚀 Деплой Frontend на Vercel

### 1. Создание проекта на Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "Add New Project"
3. Импортируйте репозиторий из GitHub
4. Выберите **фреймворк: Next.js**

### 2. Настройка Build Settings

Vercel автоматически определит настройки из `vercel.json`, но проверьте:

```
Build Command: bun run build --filter=@chatman/web
Install Command: bun install
Output Directory: apps/web/.next
Framework Preset: Next.js
```

### 3. Environment Variables

Добавьте следующие переменные окружения в Vercel:

```env
# API Configuration (замените на URL вашего деплоя API)
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_WS_URL=wss://your-api.railway.app

# App Configuration
NEXT_PUBLIC_APP_URL=https://chatman-media.vercel.app
NODE_ENV=production
```

### 4. Деплой

Нажмите "Deploy" - Vercel автоматически:
- Установит зависимости через Bun
- Соберет Next.js приложение
- Задеплоит на edge сеть

**Готово!** Frontend будет доступен на `https://your-project.vercel.app`

---

## 🔧 Деплой API (Backend)

⚠️ **Важно**: Express API нельзя напрямую деплоить на Vercel (только serverless functions).

### Рекомендуемые платформы для API:

#### 🛤️ Вариант 1: Railway (Рекомендуется)

Railway отлично работает с Turborepo и автоматически определяет настройки.

1. Создайте аккаунт на [railway.app](https://railway.app)
2. Нажмите "New Project" → "Deploy from GitHub repo"
3. Выберите репозиторий
4. Railway автоматически определит монорепо
5. Добавьте переменные окружения:

```env
PORT=2001
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=your-production-secret-key
JWT_EXPIRES_IN=7d
CORS_ALLOWED_ORIGINS=https://chatman-media.vercel.app
```

6. В настройках укажите:
   - **Root Directory**: `apps/api`
   - **Build Command**: `bun install && bun run build`
   - **Start Command**: `bun run start`

7. Добавьте PostgreSQL и Redis плагины в Railway

#### 🎨 Вариант 2: Render

1. Зайдите на [render.com](https://render.com)
2. "New" → "Web Service"
3. Подключите GitHub репозиторий
4. Настройки:
   - **Name**: chatman-api
   - **Root Directory**: `apps/api`
   - **Runtime**: Node
   - **Build Command**: `cd ../.. && bun install && cd apps/api && bun run build`
   - **Start Command**: `bun run start`

5. Добавьте PostgreSQL и Redis в Render Dashboard

#### ✈️ Вариант 3: Fly.io

1. Установите Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Войдите: `fly auth login`
3. Создайте `fly.toml` в `apps/api/`:

```toml
app = "chatman-api"
primary_region = "fra"

[build]
  builder = "paketobuildpacks/builder:base"
  buildpacks = ["gcr.io/paketo-buildpacks/nodejs"]

[env]
  PORT = "8080"
  NODE_ENV = "production"

[[services]]
  http_checks = []
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

4. Деплой: `fly deploy`

---

## 🗄️ База данных и Redis

### Railway (Самый простой)
Railway предоставляет встроенные плагины для PostgreSQL и Redis:
1. В проекте нажмите "New" → "Database" → "PostgreSQL"
2. Затем "New" → "Database" → "Redis"
3. Railway автоматически создаст переменные `DATABASE_URL` и `REDIS_URL`

### Другие варианты
- **PostgreSQL**: Supabase, Neon, PlanetScale
- **Redis**: Upstash, Redis Cloud

---

## 📋 Checklist перед деплоем

- [ ] Заменить `JWT_SECRET` на надежный ключ
- [ ] Настроить CORS с правильным доменом frontend
- [ ] Проверить все environment variables
- [ ] Запустить миграции базы данных
- [ ] Настроить мониторинг (Sentry, LogRocket)
- [ ] Настроить domain (custom domain в Vercel)

---

## 🔄 Автоматический деплой

После настройки, при каждом пуше в `main`:
- **Vercel** автоматически задеплоит frontend
- **Railway/Render** автоматически задеплоит API

## 🐛 Troubleshooting

### Build fails на Vercel
```bash
# Проверьте локально
bun run build --filter=@chatman/web

# Очистите кэш в Vercel Dashboard
```

### API не подключается к базе
```bash
# Проверьте DATABASE_URL в переменных окружения
# Убедитесь что IP вашего сервиса в whitelist PostgreSQL
```

---

## 📊 Мониторинг

Рекомендуемые сервисы:
- **Uptime**: BetterStack, UptimeRobot
- **Errors**: Sentry
- **Analytics**: Vercel Analytics, Plausible
- **Logs**: Railway/Render Dashboard

---

**Готово!** 🎉 Ваше приложение развернуто в production!
