import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../../middlewares/auth-middleware'
import { fileStream } from '../../middlewares/s3-middleware'
import { CreateSongDto } from './dtos/CreateSong.dto'
import SongService from './song-service'

class SongController {
  private songService: SongService

  constructor(songService: SongService) {
    this.songService = songService
  }

  getSongs = async (req: Request, res: Response): Promise<void> => {
    try {
      const skip = req.query.skip ? parseInt(req.query.skip as string) : 0
      const limit = 10
      const songs = await this.songService.getSongs(skip, limit)
      res.status(200).json(songs)
    } catch (err) {
      res.status(500).json({ message: 'Error getting songs' })
    }
  }

  getSongsByIds = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ids } = req.body
      const songs = await this.songService.getSongsByIds(ids)
      res.status(200).json(songs)
    } catch (err) {
      res.status(500).json({ message: 'Error getting songs' })
    }
  }

  getSongById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const song = await this.songService.getSongById(id)
      if (!song) {
        res.status(404).json({ message: 'Song not found' })
        return
      }
      res.status(200).json(song)
    } catch (err) {
      res.status(500).json({ message: 'Error getting song' })
    }
  }

  getSongByArtist = async (req: Request, res: Response): Promise<void> => {
    try {
      const { artist } = req.params
      const songs = await this.songService.getSongsByArtist(artist)
      res.status(200).json(songs)
    } catch (err) {
      res.status(500).json({ message: 'Error getting songs' })
    }
  }

  createSong = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const data: CreateSongDto = req.body
      const authUser = req.authUser
      if (!authUser) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }
      const artist = authUser.id
      const song = await this.songService.createSong(data, artist)
      res.status(201).json(song)
    } catch (err) {
      res.status(500).json({ message: 'Error creating song' })
    }
  }

  streamSong = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const song = await this.songService.getSongById(id)
      if (!song) {
        res.status(404).json({ message: 'Song not found' })
        return
      }
      const stream = await fileStream(song.fileKey)
      if (!stream) {
        res.status(404).json({ message: 'Song not found' })
        return
      }
      res.setHeader('Content-Type', 'audio/mpeg')
      stream.pipe(res)
    } catch (err) {
      res.status(500).json({ message: 'Error streaming song' })
    }
  }

  updateSong = async (
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
      const song = await this.songService.updateSong(id, authUser.id, data)
      res.status(200).json(song)
    } catch (err) {
      res.status(500).json({ message: 'Error updating song' })
    }
  }

  deleteSong = async (
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
      const song = await this.songService.deleteSong(id, authUser.id)
      if (!song) {
        res.status(404).json({ message: 'Song not found' })
        return
      }
      res.status(200).json(song)
    } catch (err) {
      res.status(500).json({ message: 'Error deleting song' })
    }
  }
}

export default SongController
