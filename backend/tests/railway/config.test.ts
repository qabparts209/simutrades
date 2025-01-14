import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { settings } from '../../src/core/config'
import { Pool } from 'pg'

describe('Railway Config', () => {
  let pool: Pool

  beforeAll(async () => {
    pool = new Pool({
      connectionString: settings.DATABASE_URL
    })
  })

  afterAll(async () => {
    await pool.end()
  })

  it('validates database configuration', async () => {
    expect(settings.DATABASE_URL).toBeDefined()
    expect(settings.POSTGRES_DB).toBeDefined()

    const { rows } = await pool.query('SELECT 1')
    expect(rows).toHaveLength(1)
  })

  it('validates Redis configuration', () => {
    expect(settings.REDIS_URL).toBeDefined()
    expect(settings.REDIS_PORT_NUM).toBeGreaterThan(0)
  })
}) 