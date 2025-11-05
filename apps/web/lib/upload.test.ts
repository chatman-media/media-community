import { describe, expect, it } from 'vitest'
import { getOptimizedImageUrl } from './upload'

describe('Upload utilities', () => {
  describe('getOptimizedImageUrl', () => {
    it('should return original URL without options', () => {
      const url = 'https://example.com/image.jpg'
      const result = getOptimizedImageUrl(url)
      expect(result).toBe(url)
    })

    it('should add width parameter', () => {
      const url = 'https://example.com/image.jpg'
      const result = getOptimizedImageUrl(url, { width: 800 })
      expect(result).toBe('https://example.com/image.jpg?w=800')
    })

    it('should add height parameter', () => {
      const url = 'https://example.com/image.jpg'
      const result = getOptimizedImageUrl(url, { height: 600 })
      expect(result).toBe('https://example.com/image.jpg?h=600')
    })

    it('should add quality parameter', () => {
      const url = 'https://example.com/image.jpg'
      const result = getOptimizedImageUrl(url, { quality: 80 })
      expect(result).toBe('https://example.com/image.jpg?q=80')
    })

    it('should add format parameter', () => {
      const url = 'https://example.com/image.jpg'
      const result = getOptimizedImageUrl(url, { format: 'webp' })
      expect(result).toBe('https://example.com/image.jpg?f=webp')
    })

    it('should combine multiple parameters', () => {
      const url = 'https://example.com/image.jpg'
      const result = getOptimizedImageUrl(url, {
        width: 800,
        height: 600,
        quality: 80,
        format: 'webp',
      })
      expect(result).toBe('https://example.com/image.jpg?w=800&h=600&q=80&f=webp')
    })
  })
})
