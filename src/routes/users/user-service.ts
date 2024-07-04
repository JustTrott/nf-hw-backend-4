import { IUser } from './models/User'
import UserModel from './models/User'

class UserService {
  async getUsers(skip: number, limit: number): Promise<IUser[]> {
    const users = await UserModel.find().skip(skip).limit(limit)
    return users
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email })
    return user
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id).populate('playlists')
    return user
  }

  async updateUser(
    id: string,
    data: Partial<IUser>,
    userId: string
  ): Promise<IUser | null> {
    const user = await UserModel.findById(id)
    if (!user) return null
    if (user.id !== userId) return null
    user.set(data)
    await user.save()
    return user
  }

  async deleteUser(id: string, userId: string): Promise<IUser | null> {
    const user = await UserModel.findById(id)
    if (!user) return null
    if (user.id !== userId) return null
    await user.deleteOne()
    return user
  }
}

export default UserService
