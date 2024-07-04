import UserService from './user-service'
import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../../middlewares/auth-middleware'

class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const skip = req.query.skip ? parseInt(req.query.skip as string) : 0
      const limit = 10
      const users = await this.userService.getUsers(skip, limit)
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ message: 'Error getting users' })
    }
  }

  getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.params
      const user = await this.userService.getUserByEmail(email)
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: 'Error getting user' })
    }
  }

  getUserById = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const authUser = req.authUser
      if (!authUser) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }
      const { id } = req.params
      const user = await this.userService.getUserById(id)
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      if (user.id !== authUser.id) {
        // remove favorites and playlists
        user.playlists = []
        return
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: 'Error getting user' })
    }
  }

  updateUser = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params
      const data = req.body
      const authUser = req.authUser
      if (!authUser) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }
      const user = await this.userService.updateUser(id, data, authUser.id)
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: 'Error updating user' })
    }
  }

  deleteUser = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params
      const authUser = req.authUser
      if (!authUser) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }
      const user = await this.userService.deleteUser(id, authUser.id)
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user' })
    }
  }
}

export default UserController
