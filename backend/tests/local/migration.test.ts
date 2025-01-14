import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execSync, ExecSyncOptionsWithStringEncoding } from 'child_process'
import { Pool } from 'pg'

describe('Database Migrations', () => {
  let pool: Pool

  beforeAll(async () => {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL
    })
  })

  afterAll(async () => {
    await pool.end()
  })

  it('executes migrations successfully', async () => {
    const options: ExecSyncOptionsWithStringEncoding = { encoding: 'utf8' }
    const result = execSync('npm run migrate', options)
    expect(result).not.toBeNull()
  })

  it('tests rollback functionality', async () => {
    const options: ExecSyncOptionsWithStringEncoding = { encoding: 'utf8' }
    const result = execSync('npm run migrate:rollback', options)
    expect(result).not.toBeNull()
  })

  it('loads seed data', async () => {
    const result = execSync('npm run seed', { encoding: 'utf8' })
    expect(result).not.toBeNull()

    const { rows } = await pool.query('SELECT COUNT(*) FROM users')
    expect(parseInt(rows[0].count)).toBeGreaterThan(0)
  })

  it('validates schema after migration', async () => {
    const { rows } = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `)
    expect(rows.length).toBeGreaterThan(0)
  })
}) 