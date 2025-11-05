export type GroupRole = 'owner' | 'moderator' | 'member'
export type CollaborationStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'

export interface Group {
  id: string
  name: string
  description?: string
  category?: string
  avatarUrl?: string
  isPublic: boolean
  memberCount: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface GroupMember {
  id: string
  groupId: string
  userId: string
  role: GroupRole
  joinedAt: Date
}

export interface Collaboration {
  id: string
  title: string
  description?: string
  status: CollaborationStatus
  requiredSkills: string[]
  creatorId: string
  createdAt: Date
  updatedAt: Date
}

export interface CollaborationParticipant {
  id: string
  collaborationId: string
  userId: string
  role?: string
  joinedAt: Date
}

export interface Follower {
  id: string
  followerId: string
  followingId: string
  createdAt: Date
}
