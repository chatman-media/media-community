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
NEXT_PUBLIC_API_URL=https://your-api.koyeb.app
NEXT_PUBLIC_WS_URL=wss://your-api.koyeb.app

# App Configuration
NEXT_PUBLIC_APP_URL=https://chatman-media.vercel.app
NODE_ENV=production

# Vercel Blob (для загрузки файлов)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_YOUR_TOKEN_HERE
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

#### 🚀 Вариант 1: Koyeb (Рекомендуется)

Koyeb - платформа для деплоя с поддержкой Docker и автоматическим масштабированием.

**1. Подготовка**

Убедитесь, что в репозитории есть:
- `apps/api/Dockerfile` ✅ (уже создан)
- `.koyeb/config.yaml` ✅ (уже создан)

**2. Создание проекта на Koyeb**

1. Зайдите на [koyeb.com](https://www.koyeb.com)
2. Нажмите "Create App"
3. Выберите "Deploy from GitHub"
4. Подключите ваш репозиторий
5. Koyeb автоматически обнаружит Dockerfile

**3. Настройка деплоя**

```
Docker Build Context: /
Dockerfile Path: apps/api/Dockerfile
Port: 2001
Instance Type: nano (для старта, можно увеличить)
```

**4. Environment Variables**

Добавьте в Koyeb Dashboard:

```env
PORT=2001
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=your-production-secret-key
JWT_EXPIRES_IN=7d
CORS_ALLOWED_ORIGINS=https://chatman-media.vercel.app
```

**5. База данных**

Для PostgreSQL и Redis можно использовать:
- **Supabase** (PostgreSQL) - бесплатный tier
- **Upstash** (Redis) - бесплатный tier

Или добавить managed databases в Koyeb.

**6. Деплой**

Нажмите "Deploy" - Koyeb автоматически:
- Соберет Docker образ
- Запустит health check на `/health`
- Выдаст публичный URL: `https://your-app.koyeb.app`

**Готово!** API будет доступен на `https://your-app.koyeb.app`

---

#### 🛤️ Вариант 2: Railway

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

#### 🎨 Вариант 3: Render

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

#### ✈️ Вариант 4: Fly.io

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

## 📦 Vercel Blob - Хранилище файлов

Vercel Blob используется для загрузки и хранения файлов (изображения, видео, документы).

### 1. Создание Blob Store

1. Откройте ваш проект на [vercel.com](https://vercel.com)
2. Перейдите в раздел **Storage**
3. Нажмите **Create Database**
4. Выберите **Blob**
5. Дайте название (например, `chatman-files`)
6. Нажмите **Create**

### 2. Получение токена

После создания Blob Store:
1. Vercel автоматически создаст переменную `BLOB_READ_WRITE_TOKEN`
2. Токен будет доступен в разделе **Environment Variables**
3. Скопируйте токен в формате `vercel_blob_rw_XXXXX`

### 3. Добавление в проект

Vercel автоматически добавит `BLOB_READ_WRITE_TOKEN` в environment variables вашего проекта.

**Для локальной разработки** добавьте в `.env.local`:
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXX
```

### 4. Использование

Загрузка уже настроена в проекте:
- **API Route**: `apps/web/app/api/upload/route.ts`
- **Upload Component**: `apps/web/components/upload-button.tsx`
- **Upload Utilities**: `apps/web/lib/upload.ts`

**Пример использования компонента:**
```tsx
import { UploadButton } from '@/components/upload-button'

<UploadButton
  accept="image/*"
  maxSize={10} // MB
  onUploadComplete={(url) => {
    console.log('File uploaded:', url)
  }}
/>
```

**Пример прямого использования:**
```typescript
import { uploadFile } from '@/lib/upload'

const file = // ... получить File из input
const result = await uploadFile(file)
console.log(result.url) // Публичный URL файла
```

### 5. Оптимизация изображений

Vercel Blob автоматически оптимизирует изображения. Используйте параметры URL:

```typescript
import { getOptimizedImageUrl } from '@/lib/upload'

const optimizedUrl = getOptimizedImageUrl(originalUrl, {
  width: 800,
  quality: 80,
  format: 'webp'
})
```

### 6. Лимиты

Бесплатный план Vercel включает:
- **100 GB** трафика в месяц
- **Неограниченное** количество файлов
- **Автоматическая** оптимизация изображений

---

## 📋 Checklist перед деплоем

- [ ] Создать Vercel Blob Store и получить `BLOB_READ_WRITE_TOKEN`
- [ ] Заменить `JWT_SECRET` на надежный ключ
- [ ] Настроить CORS с правильным доменом frontend
- [ ] Проверить все environment variables (Koyeb + Vercel)
- [ ] Запустить миграции базы данных
- [ ] Протестировать загрузку файлов в Vercel Blob
- [ ] Настроить мониторинг (Sentry, LogRocket)
- [ ] Настроить domain (custom domain в Vercel)

---

## 🔄 Автоматический деплой

После настройки, при каждом пуше в `main`:
- **Vercel** автоматически задеплоит frontend
- **Koyeb/Railway/Render** автоматически задеплоит API

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
