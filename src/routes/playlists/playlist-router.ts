import { Router } from 'express'

import PlaylistController from './playlist-controller'
import PlaylistService from './playlist-service'

import { authMiddleware } from '../../middlewares/auth-middleware'

const playlistRouter = Router()

const playlistService = new PlaylistService()

const playlistController = new PlaylistController(playlistService)

playlistRouter.get('/', playlistController.getPlaylists)
playlistRouter.post('/', authMiddleware, playlistController.createPlaylist)
playlistRouter.get('/:id', playlistController.getPlaylistById)
playlistRouter.put('/:id', authMiddleware, playlistController.updatePlaylist)
playlistRouter.delete('/:id', authMiddleware, playlistController.deletePlaylist)

export default playlistRouter
