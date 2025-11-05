import { z } from 'zod'

export const contentTypeSchema = z.enum(['post', 'video', 'audio', 'image', 'project'])
export const contentStatusSchema = z.enum(['draft', 'published', 'archived'])

export const createContentSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(255),
  description: z.string().max(5000).optional(),
  contentType: contentTypeSchema,
  mediaUrls: z.array(z.string().url()).max(10).default([]),
  tags: z.array(z.string()).max(20).default([]),
  status: contentStatusSchema.default('draft'),
})

export const updateContentSchema = createContentSchema.partial()

export const createCommentSchema = z.object({
  contentId: z.string().uuid(),
  text: z.string().min(1, 'Комментарий не может быть пустым').max(1000),
  parentId: z.string().uuid().optional(),
})
