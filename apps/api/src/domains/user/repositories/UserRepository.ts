import type { RegisterData } from '@chatman/shared'
import type { Pool } from 'pg'
import { User } from '../entities/User.js'

export class UserRepository {
  constructor(private db: Pool) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1 AND is_active = true', [
      id,
    ])
    return result.rows[0] ? this.mapToEntity(result.rows[0]) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email]
    )
    return result.rows[0] ? this.mapToEntity(result.rows[0]) : null
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE username = $1 AND is_active = true',
      [username]
    )
    return result.rows[0] ? this.mapToEntity(result.rows[0]) : null
  }

  async create(data: RegisterData & { passwordHash: string }): Promise<User> {
    const result = await this.db.query(
      `INSERT INTO users (email, username, password_hash, full_name, role, is_verified, is_active)
       VALUES ($1, $2, $3, $4, 'user', false, true)
       RETURNING *`,
      [data.email, data.username, data.passwordHash, data.fullName || null]
    )
    return this.mapToEntity(result.rows[0])
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const fields: string[] = []
    const values: unknown[] = []
    let paramCount = 1

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== 'id') {
        fields.push(`${this.toSnakeCase(key)} = $${paramCount}`)
        values.push(value)
        paramCount++
      }
    }

    if (fields.length === 0) {
      return this.findById(id)
    }

    values.push(id)
    const result = await this.db.query(
      `UPDATE users SET ${fields.join(', ')}, updated_at = NOW()
       WHERE id = $${paramCount} AND is_active = true
       RETURNING *`,
      values
    )

    return result.rows[0] ? this.mapToEntity(result.rows[0]) : null
  }

  private mapToEntity(row: Record<string, unknown>): User {
    return new User({
      id: row.id as string,
      email: row.email as string,
      username: row.username as string,
      passwordHash: row.password_hash as string,
      fullName: row.full_name as string | undefined,
      bio: row.bio as string | undefined,
      avatarUrl: row.avatar_url as string | undefined,
      role: row.role as 'user' | 'creator' | 'mentor' | 'admin',
      isVerified: row.is_verified as boolean,
      isActive: row.is_active as boolean,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
      lastLoginAt: row.last_login_at ? new Date(row.last_login_at as string) : undefined,
    })
  }

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }
}
