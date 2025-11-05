/**
 * Test helper utilities
 */

export function createMockUser(overrides = {}) {
  return {
    id: '123',
    email: 'test@example.com',
    username: 'testuser',
    password_hash: 'hashed_password',
    role: 'user' as const,
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
