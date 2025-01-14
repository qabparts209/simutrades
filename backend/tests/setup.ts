import { beforeAll, afterAll, vi } from 'vitest'

// Mock global fetch
global.fetch = vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    status: 200,
    headers: new Headers()
  } as Response)
)

// Mock Octokit
vi.mock('@octokit/rest', () => ({
  Octokit: vi.fn().mockImplementation(() => ({
    repos: {
      getBranchProtection: vi.fn().mockResolvedValue({
        data: {
          required_status_checks: {},
          enforce_admins: { enabled: true },
          required_pull_request_reviews: {
            required_approving_review_count: 1,
            dismiss_stale_reviews: true
          }
        }
      })
    }
  }))
}))

// Mock Cloudflare
vi.mock('cloudflare', () => ({
  Cloudflare: vi.fn().mockImplementation(() => ({
    dnsRecords: {
      browse: vi.fn().mockResolvedValue({
        result: [
          { type: 'A', name: 'simutrades.com' },
          { type: 'CNAME', name: 'www.simutrades.com' }
        ]
      })
    },
    zones: {
      read: vi.fn().mockResolvedValue({
        result: {
          status: 'active',
          ssl: { status: 'active' }
        }
      }),
      settings: {
        read: vi.fn().mockResolvedValue({
          result: {
            minify: { status: 'on' },
            browser_cache_ttl: { value: 14400 }
          }
        })
      }
    }
  }))
}))

afterAll(() => {
  vi.clearAllMocks()
}) 