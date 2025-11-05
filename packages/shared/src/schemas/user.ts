import { z } from 'zod'

export const userRoleSchema = z.enum(['user', 'creator', 'mentor', 'admin'])

export const registerSchema = z.object({
  email: z.string().email('Некорректный email'),
  username: z
    .string()
    .min(3, 'Имя пользователя должно содержать минимум 3 символа')
    .max(50, 'Имя пользователя должно содержать максимум 50 символов')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Только латинские буквы, цифры, дефис и подчеркивание'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
  fullName: z.string().max(255).optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(1, 'Пароль обязателен'),
})

export const updateProfileSchema = z.object({
  fullName: z.string().max(255).optional(),
  bio: z.string().max(1000).optional(),
  profession: z.string().max(100).optional(),
  skills: z.array(z.string()).max(20).optional(),
  socialLinks: z.record(z.string().url()).optional(),
  isSeekingCollaboration: z.boolean().optional(),
  isMentor: z.boolean().optional(),
})
