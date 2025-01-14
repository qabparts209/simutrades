import * as crypto from 'crypto'

export const verifyWebhookSignature = (
  payload: string,
  signature: string,
  secret: string = process.env.GITHUB_WEBHOOK_SECRET || ''
): boolean => {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

export const checkRateLimit = async (headers: Headers): Promise<boolean> => {
  const remaining = parseInt(headers.get('x-ratelimit-remaining') || '0', 10)
  const resetTime = parseInt(headers.get('x-ratelimit-reset') || '0', 10)
  
  if (remaining === 0) {
    const now = Math.floor(Date.now() / 1000)
    if (now < resetTime) {
      return false
    }
  }
  return true
} 