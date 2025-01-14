import { describe, it, expect } from 'vitest'
import { Cloudflare } from 'cloudflare'

const cf = new Cloudflare({
  token: process.env.CLOUDFLARE_API_TOKEN
})

describe('Cloudflare DNS', () => {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID
  const domain = 'simutrades.com'

  it('verifies DNS records', async () => {
    const { result } = await cf.dnsRecords.browse(zoneId)
    
    const aRecord = result.find(r => r.type === 'A' && r.name === domain)
    expect(aRecord).toBeDefined()
    
    const cnameRecord = result.find(r => r.type === 'CNAME' && r.name === `www.${domain}`)
    expect(cnameRecord).toBeDefined()
  })

  it('validates SSL certificate', async () => {
    const { result } = await cf.zones.read(zoneId)
    expect(result.status).toBe('active')
    expect(result.ssl.status).toBe('active')
  })

  it('checks CDN configuration', async () => {
    const { result } = await cf.zones.settings.read(zoneId)
    expect(result.minify.status).toBe('on')
    expect(result.browser_cache_ttl.value).toBeGreaterThan(0)
  })
}) 