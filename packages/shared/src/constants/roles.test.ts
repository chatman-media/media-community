import { describe, expect, it } from 'vitest'
import { USER_ROLES, GROUP_ROLES, ROLE_PERMISSIONS } from './roles'

describe('roles constants', () => {
  describe('USER_ROLES', () => {
    it('should have defined user roles', () => {
      expect(USER_ROLES).toBeDefined()
      expect(USER_ROLES.USER).toBe('user')
      expect(USER_ROLES.ADMIN).toBe('admin')
      expect(USER_ROLES.CREATOR).toBe('creator')
      expect(USER_ROLES.MENTOR).toBe('mentor')
    })
  })

  describe('GROUP_ROLES', () => {
    it('should have defined group roles', () => {
      expect(GROUP_ROLES).toBeDefined()
      expect(GROUP_ROLES.OWNER).toBe('owner')
      expect(GROUP_ROLES.MODERATOR).toBe('moderator')
      expect(GROUP_ROLES.MEMBER).toBe('member')
    })
  })

  describe('ROLE_PERMISSIONS', () => {
    it('should have permissions for each user role', () => {
      expect(ROLE_PERMISSIONS[USER_ROLES.USER]).toBeDefined()
      expect(ROLE_PERMISSIONS[USER_ROLES.CREATOR]).toBeDefined()
      expect(ROLE_PERMISSIONS[USER_ROLES.MENTOR]).toBeDefined()
      expect(ROLE_PERMISSIONS[USER_ROLES.ADMIN]).toBeDefined()
    })

    it('should have correct permissions for user', () => {
      const userPerms = ROLE_PERMISSIONS[USER_ROLES.USER]
      expect(userPerms).toContain('read')
      expect(userPerms).toContain('create_content')
    })

    it('should have all permissions for admin', () => {
      const adminPerms = ROLE_PERMISSIONS[USER_ROLES.ADMIN]
      expect(adminPerms).toContain('*')
    })
  })
})
