import { S3, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Upload } from '@aws-sdk/lib-storage'
import { Readable } from 'stream'

export const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export const listBuckets = async () => {
  await s3
    .listBuckets({})
    .then((data) => {
      console.log(data.Buckets)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const uploadFile = async (key: string, file: Buffer) => {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: file
      //   ACL: 'public-read'
    }
  })
  await upload
    .done()
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export const editFile = async (key: string, file: Buffer) => {
  await s3
    .putObject({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: file
    })
    .then((data) => {
      console.log(
        `File ${key} has been updated in ${process.env.AWS_BUCKET_NAME!}`
      )
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export const deleteFile = async (key: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key
    })
    .then((data) => {
      console.log(
        `File ${key} has been deleted from ${process.env.AWS_BUCKET_NAME!}`
      )
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export const fileStream = async (key: string) => {
  const response = await s3
    .getObject({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key
    })
    .then((data) => {
      console.log(data)
      return data
    })
    .catch((err) => {
      console.log(err.message)
    })
  if (!response) {
    return null
  }
  return response.Body as Readable
}

export const getFileUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key
  })
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  return url
}

export const getFile = async (key: string) => {
  const response = await s3
    .getObject({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err.message)
    })
  if (!response) {
    return null
  }
  return response.Body as Readable
}
