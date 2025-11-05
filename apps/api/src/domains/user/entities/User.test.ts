import { describe, expect, it } from 'vitest'
import { User } from './User'

describe('User Entity', () => {
  it('should create a user entity', () => {
    const user = new User({
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      passwordHash: 'hashed_password',
      role: 'user',
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    expect(user.id).toBe('123')
    expect(user.email).toBe('test@example.com')
    expect(user.username).toBe('testuser')
  })

  it('should convert user to JSON without password', () => {
    const user = new User({
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      passwordHash: 'hashed_password',
      role: 'user',
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const json = user.toJSON()

    expect(json).not.toHaveProperty('passwordHash')
    expect(json).toHaveProperty('id')
    expect(json).toHaveProperty('email')
    expect(json).toHaveProperty('username')
  })

  it('should have correct role', () => {
    const user = new User({
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      passwordHash: 'hashed_password',
      role: 'admin',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    expect(user.role).toBe('admin')
  })
})
