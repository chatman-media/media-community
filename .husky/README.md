# Git Hooks

Этот проект использует [Husky](https://typicode.github.io/husky/) для автоматизации проверок перед коммитом.

## Установленные хуки

### pre-commit
Запускается перед каждым коммитом и выполняет:

1. **Lint-staged** - проверка и форматирование только измененных файлов
   - Biome check (lint + format)
   - Автоматическое исправление где возможно

2. **Typecheck** - проверка типов TypeScript во всех пакетах
   - Использует `turbo run typecheck` для параллельной проверки

3. **Tests** - запуск всех тестов
   - API tests (Bun test)
   - Web tests (Vitest)
   - Package tests (Vitest)

### commit-msg
Проверяет формат коммит-сообщения:
- Минимум 10 символов
- Не должно быть пустым

## Обход хуков (не рекомендуется)

Если нужно пропустить проверки (только в экстренных случаях):

```bash
git commit --no-verify -m "commit message"
```

⚠️ **Внимание**: Обход хуков может привести к проблемам в CI/CD.

## Ручной запуск проверок

Проверить код перед коммитом вручную:

```bash
# Все проверки сразу
bun run validate

# Отдельно
bun run check      # Lint + format
bun run typecheck  # Type checking
bun run test       # Tests
```

## Отключение хуков

Если хуки мешают разработке:

```bash
# Временно отключить
git config core.hooksPath /dev/null

# Включить обратно
git config --unset core.hooksPath
```

## Troubleshooting

### Хуки не запускаются
```bash
# Переустановить husky
bun run prepare
```

### Долгая проверка
Можно настроить в `package.json` какие проверки запускать:
- Убрать `bun run test` из pre-commit если тесты долгие
- Использовать только lint-staged без typecheck
