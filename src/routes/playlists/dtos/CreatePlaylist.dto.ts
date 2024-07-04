import { Types } from 'mongoose'

export interface CreatePlaylistDto {
  title: string
  description: string
  imageKey: string
  isFavorites: boolean
}
