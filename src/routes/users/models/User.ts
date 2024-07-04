import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  username: string
  password: string
  bio?: string
  imageKey?: string
  playlists: mongoose.Schema.Types.ObjectId[]
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  imageKey: { type: String },
  favorites: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist'
    },
    default: []
  },
  playlists: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
      }
    ],
    default: []
  }
})

export default mongoose.model<IUser>('User', UserSchema)
