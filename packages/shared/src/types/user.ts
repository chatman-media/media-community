export type UserRole = 'user' | 'creator' | 'mentor' | 'admin'

export interface User {
  id: string
  email: string
  username: string
  fullName?: string
  bio?: string
  avatarUrl?: string
  role: UserRole
  isVerified: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

export interface UserProfile {
  id: string
  userId: string
  profession?: string
  skills: string[]
  socialLinks: Record<string, string>
  isSeekingCollaboration: boolean
  isMentor: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserWithProfile extends User {
  profile?: UserProfile
}

export interface UserStats {
  followerCount: number
  followingCount: number
  contentCount: number
  collaborationCount: number
}
