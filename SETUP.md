# Инструкция по запуску проекта Chatman.media

## Требования

- **Bun** >= 1.3.0
- **Node.js** >= 20.0.0
- **Docker** и **Docker Compose**

## Быстрый старт

### 1. Установка зависимостей

```bash
bun install
```

### 2. Запуск баз данных (PostgreSQL + Redis)

```bash
bun run docker:up
```

Это запустит:
- PostgreSQL на порту `5432`
- Redis на порту `6379`
- Adminer (веб-интерфейс для PostgreSQL) на порту `8080`

### 3. Настройка переменных окружения

#### Frontend (apps/web)
```bash
cp apps/web/.env.local.example apps/web/.env.local
```

#### Backend (apps/api)
```bash
cp apps/api/.env.example apps/api/.env
```

### 4. Инициализация базы данных

При первом запуске Docker автоматически выполнит миграции из `apps/api/src/infrastructure/database/migrations/001_init.sql`.

Если нужно выполнить миграции вручную:
```bash
docker exec -i chatman-postgres psql -U chatman -d chatman_db < apps/api/src/infrastructure/database/migrations/001_init.sql
```

### 5. Запуск приложения в режиме разработки

```bash
bun run dev
```

Это запустит:
- **Frontend** на `http://localhost:2000`
- **Backend API** на `http://localhost:2001`

## Доступные команды

### Корневые команды

```bash
bun run dev          # Запуск всех приложений в режиме разработки
bun run build        # Сборка всех приложений
bun run test         # Запуск тестов во всех пакетах
bun run lint         # Линтинг кода
bun run format       # Форматирование кода с Prettier
bun run clean        # Очистка node_modules и кэша
```

### Docker команды

```bash
bun run docker:up    # Запуск Docker контейнеров
bun run docker:down  # Остановка Docker контейнеров
bun run docker:logs  # Просмотр логов контейнеров
```

### Frontend (apps/web)

```bash
cd apps/web
bun run dev          # Запуск dev сервера
bun run build        # Сборка для продакшена
bun run start        # Запуск prod сервера
bun run test         # Запуск тестов с Vitest
bun run lint         # Линтинг
```

### Backend (apps/api)

```bash
cd apps/api
bun run dev          # Запуск dev сервера с hot reload
bun run build        # Компиляция TypeScript
bun run start        # Запуск prod сервера
bun run test         # Запуск тестов
```

## Структура проекта

```
chatman-media-community/
├── apps/
│   ├── web/              # Next.js 15 frontend (React 19)
│   │   ├── app/          # App Router страницы
│   │   ├── components/   # React компоненты
│   │   └── lib/          # Утилиты и доменная логика
│   └── api/              # Express.js backend
│       └── src/
│           ├── domains/           # DDD домены
│           │   ├── user/         # Домен пользователей
│           │   ├── content/      # Домен контента
│           │   ├── community/    # Домен сообщества
│           │   └── monetization/ # Домен монетизации
│           ├── infrastructure/    # Инфраструктурный слой
│           └── presentation/      # Слой представления
├── packages/
│   ├── shared/           # Общие типы и утилиты
│   ├── ui/              # UI компоненты
│   └── config/          # TypeScript конфигурации
└── docker-compose.yml   # Docker конфигурация

```

## Доступ к сервисам

- **Frontend**: http://localhost:2000
- **Backend API**: http://localhost:2001
- **API Health Check**: http://localhost:2001/health
- **PostgreSQL**: localhost:5432
  - User: `chatman`
  - Password: `chatman123`
  - Database: `chatman_db`
- **Redis**: localhost:6379
- **Adminer (DB UI)**: http://localhost:8080

## Архитектура

### Frontend (Next.js)
- **App Router** для роутинга
- **React 19** с новыми возможностями
- **Tailwind CSS** для стилей
- **Vitest** для тестирования

### Backend (Express)
- **Domain-Driven Design (DDD)** архитектура
- **PostgreSQL** для основной БД
- **Redis** для кэширования и очередей
- **JWT** для аутентификации
- **Zod** для валидации

### Monorepo (Turborepo)
- **Bun** как package manager
- **Workspace** для переиспользования кода
- **Shared packages** для типов и утилит

## Разработка

### Создание новой фичи

1. Создайте доменный слой в `apps/api/src/domains/`
2. Добавьте типы в `packages/shared/src/types/`
3. Создайте компоненты UI в `packages/ui/src/components/`
4. Реализуйте страницы в `apps/web/app/`

### Тестирование

```bash
# Запуск всех тестов
bun run test

# Запуск тестов с UI
cd apps/web
bun run test:ui
```

## Troubleshooting

### Docker контейнеры не запускаются

```bash
# Остановите и удалите контейнеры
docker-compose down -v

# Запустите заново
bun run docker:up
```

### Ошибки при установке зависимостей

```bash
# Очистите кэш и переустановите
bun run clean
bun install
```

### PostgreSQL connection refused

Проверьте, что Docker контейнер запущен:
```bash
docker ps | grep chatman-postgres
```

## Дополнительная информация

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Bun Documentation](https://bun.sh/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/docs/)
