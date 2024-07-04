import { CreateSongDto } from './dtos/CreateSong.dto'
import { ISong } from './models/Song'
import { IUser } from '../users/models/User'
import SongModel from './models/Song'
import { getFileUrl } from '../../middlewares/s3-middleware'

class SongService {
  async createSong(
    createSongDto: CreateSongDto,
    owner: string
  ): Promise<ISong> {
    const { title, fileKey, imageKey } = createSongDto
    const newSong = new SongModel({
      title,
      artist: owner,
      fileKey,
      imageKey
    })
    console.log(newSong)
    await newSong.save()
    return newSong
  }

  async getSongs(skip: number, limit: number): Promise<ISong[]> {
    const songs = await SongModel.find()
      .populate('artist', 'username')
      .skip(skip)
      .limit(limit)
    return songs
  }

  async getSongById(id: string): Promise<ISong | null> {
    const song = await SongModel.findById(id).populate('artist', 'username')
    return song
  }

  async getSongsByIds(ids: string[]): Promise<ISong[]> {
    const songs = await SongModel.find({ _id: { $in: ids } }).populate(
      'artist',
      'username'
    )
    return songs
  }

  async getSongsByArtist(artist: string): Promise<ISong[]> {
    const songs = await SongModel.find({ artist: artist }).populate('artist')
    return songs
  }

  async updateSong(
    id: string,
    userId: string,
    data: Partial<ISong>
  ): Promise<ISong | null> {
    const song = await SongModel.findById(id)
    if (!song) return null
    if (song.artist.toString() !== userId) return null
    song.set(data)
    await song.save()
    return song
  }

  async deleteSong(id: string, userId: string): Promise<ISong | null> {
    const song = await SongModel.findById(id)
    if (!song) return null
    if (song.artist.toString() !== userId) return null
    await song.deleteOne()
    return song
  }
}

export default SongService
