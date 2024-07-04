import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import {
  listBuckets,
  uploadFile,
  editFile,
  deleteFile
} from './middlewares/s3-middleware'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const PORT = process.env.PORT || 3000

connectDB()

const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(logger)
app.use('/api/v1', globalRouter)

const server = createServer(app)
// listBuckets()
// .then(() => createBucket('nf-aws-test-bucket-2'))
// .then(() => listBuckets())
// .then(() => deleteBucket('nf-aws-test-bucket-2'))
// .then(() => listBuckets())
// .then(() =>
// uploadFile('nf-aws-test-bucket-2', 'test.txt', Buffer.from('Hello, Bibol!'))
// )
// .then(() =>
//   editFile('nf-aws-test-bucket-2', 'test.txt', Buffer.from('Bye, Bibol!'))
// )
// .then(() => deleteFile('nf-aws-test-bucket-2', 'test.txt'))

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}/api/v1`)
})
