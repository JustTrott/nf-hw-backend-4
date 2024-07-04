import { Types } from 'mongoose'

export interface CreateSongDto {
  title: string
  // artist: Types.ObjectId // Assuming you'll pass the artist's ObjectId
  imageKey: string
  fileKey: string
}
