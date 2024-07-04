import { Router } from 'express'
import SongController from './song-controller'
import SongService from './song-service'

import { authMiddleware } from '../../middlewares/auth-middleware'

const songRouter = Router()

const songService = new SongService()

const songController = new SongController(songService)

songRouter.get('/', songController.getSongs)

songRouter.post('/', authMiddleware, songController.createSong)
// songRouter.post('/upload', authMiddleware, songController.uploadSongFile)
// songRouter.post('/uploadUnauth', songController.uploadSongFileUnauth)
songRouter.get('/:id', songController.getSongById)
songRouter.get('/artist/:artist', songController.getSongByArtist)
songRouter.get('/stream/:id', songController.streamSong)
songRouter.put('/:id', authMiddleware, songController.updateSong)
songRouter.delete('/:id', authMiddleware, songController.deleteSong)

export default songRouter
