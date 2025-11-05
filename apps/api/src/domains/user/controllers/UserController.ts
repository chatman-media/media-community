import type { ApiResponse } from '@chatman/shared'
import type { Request, Response } from 'express'
import type { UserService } from '../services/UserService.js'

export class UserController {
  constructor(private userService: UserService) {}

  async getProfile(req: Request, res: Response<ApiResponse>) {
    try {
      const userId = req.params.id
      const user = await this.userService.getUserById(userId)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'User not found',
          },
        })
      }

      res.json({
        success: true,
        data: user.toJSON(),
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      })
    }
  }

  async updateProfile(req: Request, res: Response<ApiResponse>) {
    try {
      const userId = req.params.id
      const updateData = req.body

      const user = await this.userService.updateUser(userId, updateData)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'User not found',
          },
        })
      }

      res.json({
        success: true,
        data: user.toJSON(),
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      })
    }
  }
}
