import { describe, expect, it } from 'vitest'
import { User } from './User'

describe('User Entity', () => {
  it('should create a user entity', () => {
    const user = new User({
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      password_hash: 'hashed_password',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
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
      password_hash: 'hashed_password',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const json = user.toJSON()

    expect(json).not.toHaveProperty('password_hash')
    expect(json).toHaveProperty('id')
    expect(json).toHaveProperty('email')
    expect(json).toHaveProperty('username')
  })

  it('should have correct role', () => {
    const user = new User({
      id: '123',
      email: 'test@example.com',
      username: 'testuser',
      password_hash: 'hashed_password',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    })

    expect(user.role).toBe('admin')
  })
})
