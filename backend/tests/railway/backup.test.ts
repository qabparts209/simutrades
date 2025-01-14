import { describe, it, expect } from 'vitest'
import { settings } from '../../src/core/config'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

describe('Railway Backup', () => {
  const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  })

  it('validates backup configuration', () => {
    expect(settings.BACKUP_BUCKET).toBeDefined()
  })

  it('verifies S3 access', async () => {
    const testFile = Buffer.from('test backup')
    const command = new PutObjectCommand({
      Bucket: settings.BACKUP_BUCKET,
      Key: 'test.txt',
      Body: testFile
    })

    const response = await s3Client.send(command)
    expect(response.$metadata.httpStatusCode).toBe(200)
  })
}) 