/**
 * Test helper utilities
 */

export function createMockUser(overrides = {}) {
  return {
    id: '123',
    email: 'test@example.com',
    username: 'testuser',
    passwordHash: 'hashed_password',
    role: 'user' as const,
    isVerified: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
