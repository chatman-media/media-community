import { describe, expect, it } from 'vitest'
import { formatDate, formatDateTime, getRelativeTime } from './date'

describe('date utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2025-01-15T12:00:00Z')
      const formatted = formatDate(date)
      expect(formatted).toBeTruthy()
      expect(typeof formatted).toBe('string')
    })

    it('should handle Date object', () => {
      const date = new Date()
      const formatted = formatDate(date)
      expect(formatted).toBeTruthy()
    })

    it('should handle string date', () => {
      const formatted = formatDate('2025-01-15')
      expect(formatted).toBeTruthy()
      expect(typeof formatted).toBe('string')
    })
  })

  describe('formatDateTime', () => {
    it('should format datetime with time', () => {
      const date = new Date('2025-01-15T12:30:00Z')
      const formatted = formatDateTime(date)
      expect(formatted).toBeTruthy()
      expect(typeof formatted).toBe('string')
    })
  })

  describe('getRelativeTime', () => {
    it('should return "только что" for recent dates', () => {
      const date = new Date(Date.now() - 30 * 1000) // 30 sec ago
      const relative = getRelativeTime(date)
      expect(relative).toBe('только что')
    })

    it('should return minutes for dates within hour', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000) // 5 min ago
      const relative = getRelativeTime(date)
      expect(relative).toContain('мин. назад')
    })
  })
})
