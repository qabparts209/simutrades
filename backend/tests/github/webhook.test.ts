import { describe, it, expect, beforeEach } from 'vitest'
import { verifyWebhookSignature, checkRateLimit } from '../../src/utils/github'
import crypto from 'crypto'

describe('GitHub Webhook', () => {
  const secret = 'test_secret'
  
  beforeEach(() => {
    process.env.GITHUB_WEBHOOK_SECRET = secret
  })

  it('validates webhook signatures', () => {
    const payload = JSON.stringify({ action: 'opened' })
    const hmac = crypto.createHmac('sha256', secret)
    const signature = 'sha256=' + hmac.update(payload).digest('hex')
    
    const result = verifyWebhookSignature(payload, signature)
    expect(result).toBe(true)
  })

  it('handles rate limiting', async () => {
    const headers = new Headers({
      'x-ratelimit-remaining': '0',
      'x-ratelimit-reset': (Math.floor(Date.now() / 1000) + 3600).toString()
    })
    
    const result = await checkRateLimit(headers)
    expect(result).toBe(false)
  })
}) 