# GitHub Actions Workflows

Автоматизация CI/CD для проекта Chatman.media.

## 📋 Workflows

### 🔍 CI (Continuous Integration)
**Файл:** `workflows/ci.yml`

Запускается на: push и PR в ветки `main` и `develop`

**Задачи:**
- Проверка кода с Biome (lint + format)
- Type checking всех приложений
- Сборка всех приложений в монорепо

**Джобы:**
1. `lint-and-typecheck` - проверка качества кода
2. `build` - сборка приложений

---

### 🧪 Tests
**Файл:** `workflows/test.yml`

Запускается на: push и PR в ветки `main` и `develop`

**Задачи:**
- Запуск всех тестов в монорепо
- Поднятие PostgreSQL и Redis для интеграционных тестов
- Загрузка coverage отчетов в Codecov (опционально)

**Services:**
- PostgreSQL 16 (port 5433)
- Redis 7 (port 6380)

---

### 🐳 Docker Build
**Файл:** `workflows/docker.yml`

Запускается на: изменения в `apps/api/**` или `packages/**`

**Задачи:**
- Сборка Docker образа API
- Тест запуска контейнера
- Кеширование слоев Docker для ускорения

---

### 🏷️ PR Labeler
**Файл:** `workflows/pr-labeler.yml`

Запускается на: открытие или обновление PR

**Задачи:**
- Автоматическая установка лейблов на основе измененных файлов
- Конфигурация: `labeler.yml`

**Лейблы:**
- `frontend` - изменения в apps/web
- `backend` - изменения в apps/api
- `dependencies` - обновления зависимостей
- `docker` - изменения в Docker конфигурации
- `ci/cd` - изменения в GitHub Actions
- и другие...

---

## 🤖 Dependabot

**Файл:** `dependabot.yml`

Автоматическое обновление зависимостей:
- **npm packages** - еженедельно
- **Docker images** - еженедельно
- **GitHub Actions** - еженедельно

Все обновления группируются для удобства ревью.

---

## 🚀 Деплой

Деплой настроен автоматически через:
- **Vercel** - автоматический деплой frontend при push в `main`
- **Koyeb** - автоматический деплой API при push в `main`

GitHub Actions не требуются для деплоя, но можно добавить дополнительные проверки перед деплоем.

---

## 📊 Status Badges

Добавьте в основной README.md:

```markdown
[![CI](https://github.com/YOUR_USERNAME/chatman-media-community/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/chatman-media-community/actions/workflows/ci.yml)
[![Tests](https://github.com/YOUR_USERNAME/chatman-media-community/actions/workflows/test.yml/badge.svg)](https://github.com/YOUR_USERNAME/chatman-media-community/actions/workflows/test.yml)
[![Docker Build](https://github.com/YOUR_USERNAME/chatman-media-community/actions/workflows/docker.yml/badge.svg)](https://github.com/YOUR_USERNAME/chatman-media-community/actions/workflows/docker.yml)
```

---

## 🔧 Настройка

### Secrets
Для работы некоторых workflows могут потребоваться secrets:

- `CODECOV_TOKEN` (опционально) - для загрузки coverage отчетов

Добавьте secrets в: Settings → Secrets and variables → Actions

### Permissions
Убедитесь, что workflow имеет необходимые permissions:
- `contents: read` - чтение кода
- `pull-requests: write` - создание комментариев и установка лейблов

---

## 📝 Локальная проверка

Перед пушем можно локально запустить те же проверки:

```bash
# Lint и format
biome check .

# Typecheck
bun run typecheck

# Build
bun run build

# Tests
bun run test

# Docker build
docker build -f apps/api/Dockerfile -t chatman-api:test .
```

---

## 🐛 Troubleshooting

### Workflow fails на установке зависимостей
```bash
# Убедитесь что bun.lock актуальный
bun install --frozen-lockfile
```

### Тесты падают в CI
```bash
# Проверьте что тесты проходят локально с теми же версиями сервисов
docker-compose up -d postgres redis
bun run test
```

### Docker build fails
```bash
# Проверьте локально
docker build -f apps/api/Dockerfile -t test .
```
