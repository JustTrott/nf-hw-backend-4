import mongoose, { Document, Schema } from 'mongoose'

export interface ISong extends Document {
  title: string
  artist: mongoose.Schema.Types.ObjectId
  imageKey: string
  fileKey: string
}

const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Use the validator directly
  },
  imageKey: { type: String, required: true },
  fileKey: { type: String, required: true }
})

export default mongoose.model<ISong>('Song', SongSchema)
