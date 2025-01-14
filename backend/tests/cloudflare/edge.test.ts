import { describe, it, expect, beforeAll } from 'vitest'
import { Cloudflare } from 'cloudflare'
import { settings } from '../../src/core/config'

describe('Cloudflare Edge', () => {
  let cf: Cloudflare

  beforeAll(() => {
    cf = new Cloudflare({
      token: settings.CLOUDFLARE_API_TOKEN
    })
  })

  it('verifies edge caching', async () => {
    const { result } = await cf.zones.settings.read(settings.CLOUDFLARE_ZONE_ID)
    expect(result.cache_level).toBeDefined()
    expect(result.browser_cache_ttl.value).toBeGreaterThan(0)
  })

  it('checks global distribution', async () => {
    const { result } = await cf.zones.analytics.dashboard({
      zoneId: settings.CLOUDFLARE_ZONE_ID,
      since: '-1440' // Last 24 hours
    })
    expect(result.totals.requests.all).toBeGreaterThan(0)
    expect(result.totals.bandwidth.all).toBeGreaterThan(0)
  })
}) 