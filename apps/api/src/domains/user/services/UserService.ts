import type { LoginCredentials, RegisterData } from '@chatman/shared'
import bcrypt from 'bcrypt'
import type { User } from '../entities/User.js'
import type { UserRepository } from '../repositories/UserRepository.js'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(data: RegisterData): Promise<User> {
    // Check if user already exists
    const existingUserByEmail = await this.userRepository.findByEmail(data.email)
    if (existingUserByEmail) {
      throw new Error('Email already in use')
    }

    const existingUserByUsername = await this.userRepository.findByUsername(data.username)
    if (existingUserByUsername) {
      throw new Error('Username already taken')
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10)

    // Create user
    const user = await this.userRepository.create({
      ...data,
      passwordHash,
    })

    return user
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const user = await this.userRepository.findByEmail(credentials.email)
    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    // Update last login
    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    })

    return user
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, data)
  }
}
