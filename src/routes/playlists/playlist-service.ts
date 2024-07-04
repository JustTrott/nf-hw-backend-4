import { CreatePlaylistDto } from './dtos/CreatePlaylist.dto'
import { IPlaylist } from './models/Playlist'
import PlaylistModel from './models/Playlist'
import { Schema } from 'mongoose'

class PlaylistService {
  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
    owner: string
  ): Promise<IPlaylist> {
    const { title, description, isFavorites } = createPlaylistDto

    const newPlaylist = new PlaylistModel({
      title,
      description,
      owner,
      isFavorites
    })
    // placeholder for image upload
    await newPlaylist.save()
    return newPlaylist
  }

  async getPlaylists(): Promise<IPlaylist[]> {
    const playlists = await PlaylistModel.find().populate('songs')

    return playlists
  }

  async getPlaylistById(id: string): Promise<IPlaylist | null> {
    const playlist = await PlaylistModel.findById(id).populate('songs')
    if (!playlist) return null
    return playlist
  }

  async updatePlaylist(
    id: string,
    data: Partial<IPlaylist>,
    userId: string
  ): Promise<IPlaylist | null> {
    const playlist = await PlaylistModel.findById(id)
    if (!playlist) return null
    if (playlist.owner.toString() !== userId) return null
    playlist.set(data)
    await playlist.save()
    return playlist
  }

  async addSongToPlaylist(
    playlistId: string,
    songId: string,
    userId: string
  ): Promise<IPlaylist | null> {
    const playlist = await PlaylistModel.findById(playlistId)
    if (!playlist) return null
    if (playlist.owner.toString() !== userId) return null
    playlist.songs.push(new Schema.Types.ObjectId(songId))
    await playlist.save()
    return playlist
  }

  async removeSongFromPlaylist(
    playlistId: string,
    songId: string,
    userId: string
  ): Promise<IPlaylist | null> {
    const playlist = await PlaylistModel.findById(playlistId)
    if (!playlist) return null
    if (playlist.owner.toString() !== userId) return null
    playlist.songs = playlist.songs.filter((song) => song.toString() !== songId)
    await playlist.save()
    return playlist
  }

  async deletePlaylist(id: string, userId: string): Promise<IPlaylist | null> {
    const playlist = await PlaylistModel.findById(id)
    if (!playlist) return null
    if (playlist.isFavorites) return null
    if (playlist.owner.toString() !== userId) return null
    await playlist.deleteOne()
    return playlist
  }
}

export default PlaylistService
