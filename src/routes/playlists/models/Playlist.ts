import mongoose, { Document, Schema } from 'mongoose'

export interface IPlaylist extends Document {
  title: string
  description: string
  imageKey: string
  owner: mongoose.Schema.Types.ObjectId
  songs: Array<mongoose.Schema.Types.ObjectId>
  isFavorites: boolean
}

const PlaylistSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  imageKey: { type: String, default: '' },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songs: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
      }
    ],
    default: []
  },
  isFavorites: { type: Boolean, default: false }
})

export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema)
