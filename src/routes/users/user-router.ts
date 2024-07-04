import { Router } from 'express'
import UserController from './user-controller'
import UserService from './user-service'

import { authMiddleware } from '../../middlewares/auth-middleware'

const userRouter = Router()

const userService = new UserService()

const userController = new UserController(userService)

// userRouter.get('/', userController.getUsers)
// userRouter.get('/:email', userController.getUserByEmail)
userRouter.get('/id/:id', authMiddleware, userController.getUserById)
userRouter.put('/:id', authMiddleware, userController.updateUser)
// userRouter.delete('/:id', userController.deleteUser)

export default userRouter
