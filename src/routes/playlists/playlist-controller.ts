import { Request, Response } from 'express'
import PlaylistService from './playlist-service'
import { AuthenticatedRequest } from '../../middlewares/auth-middleware'
import { CreatePlaylistDto } from './dtos/CreatePlaylist.dto'

class PlaylistController {
  private playlistService: PlaylistService

  constructor(playlistService: PlaylistService) {
    this.playlistService = playlistService
  }

  getPlaylists = async (req: Request, res: Response): Promise<void> => {
    try {
      const playlists = await this.playlistService.getPlaylists()
      res.status(200).json(playlists)
    } catch (err) {
      res.status(500).json({ message: 'Error getting playlists' })
    }
  }

  createPlaylist = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const authUser = req.authUser
      if (!authUser) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }
      const data: CreatePlaylistDto = req.body
      const playlist = await this.playlistService.createPlaylist(
        data,
        authUser.id
      )
      res.status(201).json(playlist)
    } catch (err) {
      res.status(500).json({ message: 'Error creating playlist' })
    }
  }

  getPlaylistById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const playlist = await this.playlistService.getPlaylistById(id)
      if (!playlist) {
        res.status(404).json({ message: 'Playlist not found' })
        return
      }
      res.status(200).json(playlist)
    } catch (err) {
      res.status(500).json({ message: 'Error getting playlist' })
    }
  }

  updatePlaylist = async (
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
      const playlist = await this.playlistService.updatePlaylist(
        id,
        data,
        authUser.id
      )
      if (!playlist) {
        res.status(404).json({ message: 'Playlist not found' })
        return
      }
      res.status(200).json(playlist)
    } catch (err) {
      res.status(500).json({ message: 'Error updating playlist' })
    }
  }

  deletePlaylist = async (
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
      const playlist = await this.playlistService.deletePlaylist(
        id,
        authUser.id
      )
      if (!playlist) {
        res.status(404).json({ message: 'Playlist not found' })
        return
      }
      res.status(200).json(playlist)
    } catch (err) {
      res.status(500).json({ message: 'Error deleting playlist' })
    }
  }
}

export default PlaylistController
