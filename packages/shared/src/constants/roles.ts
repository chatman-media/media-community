export const USER_ROLES = {
  USER: 'user',
  CREATOR: 'creator',
  MENTOR: 'mentor',
  ADMIN: 'admin',
} as const

export const GROUP_ROLES = {
  OWNER: 'owner',
  MODERATOR: 'moderator',
  MEMBER: 'member',
} as const

export const ROLE_PERMISSIONS = {
  [USER_ROLES.USER]: ['read', 'create_content', 'comment', 'like'],
  [USER_ROLES.CREATOR]: ['read', 'create_content', 'comment', 'like', 'create_collaboration'],
  [USER_ROLES.MENTOR]: [
    'read',
    'create_content',
    'comment',
    'like',
    'create_collaboration',
    'mentor',
  ],
  [USER_ROLES.ADMIN]: ['*'],
} as const
