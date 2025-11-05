import type { User as IUser, UserRole } from '@chatman/shared'

export class User implements IUser {
  id: string
  email: string
  username: string
  passwordHash?: string
  fullName?: string
  bio?: string
  avatarUrl?: string
  role: UserRole
  isVerified: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date

  constructor(data: IUser & { passwordHash?: string }) {
    this.id = data.id
    this.email = data.email
    this.username = data.username
    this.passwordHash = data.passwordHash
    this.fullName = data.fullName
    this.bio = data.bio
    this.avatarUrl = data.avatarUrl
    this.role = data.role
    this.isVerified = data.isVerified
    this.isActive = data.isActive
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.lastLoginAt = data.lastLoginAt
  }

  toJSON(): IUser {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
      role: this.role,
      isVerified: this.isVerified,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLoginAt: this.lastLoginAt,
    }
  }
}
