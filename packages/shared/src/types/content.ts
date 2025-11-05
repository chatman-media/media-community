export type ContentType = 'post' | 'video' | 'audio' | 'image' | 'project'
export type ContentStatus = 'draft' | 'published' | 'archived'

export interface Content {
  id: string
  userId: string
  title: string
  description?: string
  contentType: ContentType
  mediaUrls: string[]
  tags: string[]
  status: ContentStatus
  viewCount: number
  likeCount: number
  commentCount: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface Comment {
  id: string
  contentId: string
  userId: string
  parentId?: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface Like {
  id: string
  userId: string
  contentId: string
  createdAt: Date
}
