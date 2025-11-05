export const ERROR_CODES = {
  // Authentication
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',

  // Resources
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',

  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const

export const ERROR_MESSAGES = {
  [ERROR_CODES.UNAUTHORIZED]: 'Необходима авторизация',
  [ERROR_CODES.FORBIDDEN]: 'Доступ запрещен',
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Неверный email или пароль',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Токен истек',
  [ERROR_CODES.TOKEN_INVALID]: 'Недействительный токен',
  [ERROR_CODES.VALIDATION_ERROR]: 'Ошибка валидации данных',
  [ERROR_CODES.INVALID_INPUT]: 'Некорректные входные данные',
  [ERROR_CODES.NOT_FOUND]: 'Ресурс не найден',
  [ERROR_CODES.ALREADY_EXISTS]: 'Ресурс уже существует',
  [ERROR_CODES.INTERNAL_ERROR]: 'Внутренняя ошибка сервера',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Сервис временно недоступен',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Превышен лимит запросов',
} as const
