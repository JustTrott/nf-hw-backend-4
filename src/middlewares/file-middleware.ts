import path from 'path'
import multer from 'multer'

export default class FileMiddleware {
  public static readonly memoryLoader = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 16777216 // 16 MByte
    }
  })
}
