/// <reference types="vitest" />
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  // biome-ignore lint/suspicious/noExplicitAny: Required for vitest type extension
  interface Assertion<T = any> extends TestingLibraryMatchers<string, T> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<string, unknown> {}
}
