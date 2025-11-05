import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle conditional classes', () => {
    const result = cn('base-class', false && 'hidden', 'visible-class')
    expect(result).toBe('base-class visible-class')
  })

  it('should merge tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4')
    expect(result).toContain('px-4')
    expect(result).toContain('py-1')
  })

  it('should handle undefined and null', () => {
    const result = cn('base-class', undefined, null, 'other-class')
    expect(result).toBe('base-class other-class')
  })

  it('should handle empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })
})
