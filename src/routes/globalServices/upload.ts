import { Request, Response } from 'express'
import { uploadFile, getFileUrl } from '../../middlewares/s3-middleware'
import { v4 as uuid } from 'uuid'

export const uploadSingleFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const file = req.file
    if (!file) {
      res.status(400).json({ message: 'No file uploaded' })
      return
    }

    const fileKey = `${uuid()}-${file.filename}`
    await uploadFile(fileKey, file.buffer).then((data) => {
      res.status(201).json({ fileKey })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error uploading file' })
  }
}
