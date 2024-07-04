import { Router } from 'express'
import authRouter from './auth/auth-router'
import userRouter from './users/user-router'
import songRouter from './songs/song-router'
import playlistRouter from './playlists/playlist-router'
import { authMiddleware } from '../middlewares/auth-middleware'
import { uploadSingleFile } from './globalServices/upload'
import { getImage } from './globalServices/image'

// other routers can be imported here

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use('/users', userRouter)
globalRouter.use('/songs', songRouter)
globalRouter.use('/playlists', playlistRouter)
globalRouter.post('/upload-file', authMiddleware, uploadSingleFile)
globalRouter.get('/image/:key', getImage)

// other routers can be added here

export default globalRouter
