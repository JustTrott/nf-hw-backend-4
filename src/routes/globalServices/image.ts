import { getFile } from '../../middlewares/s3-middleware'

import { Request, Response } from 'express'

export async function getImage(req: Request, res: Response): Promise<void> {
  try {
    const { key } = req.params
    const file = await getFile(key)
    res.status(200).send(file)
  } catch (err) {
    res.status(500).json({ message: 'Error getting image' })
  }
}
