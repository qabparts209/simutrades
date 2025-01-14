import { describe, it, expect } from 'vitest'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

describe('GitHub Branch Protection', () => {
  const owner = 'simutrades'
  const repo = 'simutrades'

  it('verifies main branch protection', async () => {
    const { data } = await octokit.repos.getBranchProtection({
      owner,
      repo,
      branch: 'main'
    })
    
    expect(data.required_status_checks).toBeDefined()
    expect(data.enforce_admins.enabled).toBe(true)
    expect(data.required_pull_request_reviews).toBeDefined()
  })

  it('checks review requirements', async () => {
    const { data } = await octokit.repos.getBranchProtection({
      owner,
      repo,
      branch: 'main'
    })
    
    const reviews = data.required_pull_request_reviews
    expect(reviews.required_approving_review_count).toBeGreaterThanOrEqual(1)
    expect(reviews.dismiss_stale_reviews).toBe(true)
  })
}) 