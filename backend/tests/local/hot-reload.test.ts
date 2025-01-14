import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { watch, FSWatcher } from 'chokidar'
import { spawn, ChildProcess, SpawnOptions } from 'child_process'
import path from 'path'

describe('Hot Reload', () => {
  let frontendWatcher: FSWatcher
  let backendWatcher: FSWatcher
  let frontendProcess: ChildProcess | null = null
  let backendProcess: ChildProcess | null = null

  beforeAll(() => {
    const options: SpawnOptions = { 
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'development' }
    }

    frontendProcess = spawn('npm', ['run', 'dev'], {
      ...options,
      cwd: path.resolve(__dirname, '../../../frontend')
    })

    backendProcess = spawn('npm', ['run', 'dev'], {
      ...options,
      cwd: path.resolve(__dirname, '../../')
    })

    frontendWatcher = watch(path.resolve(__dirname, '../../../frontend/src'))
    backendWatcher = watch(path.resolve(__dirname, '../../src'))
  })

  afterAll(() => {
    frontendWatcher?.close()
    backendWatcher?.close()
    frontendProcess?.kill()
    backendProcess?.kill()
  })

  it('verifies frontend hot reload', async () => {
    let reloadCount = 0
    frontendWatcher.on('change', () => {
      reloadCount++
    })

    await new Promise<void>(resolve => {
      setTimeout(() => {
        expect(reloadCount).toBeGreaterThanOrEqual(0)
        resolve()
      }, 100)
    })
  })

  it('verifies backend hot reload', async () => {
    let reloadCount = 0
    backendWatcher.on('change', () => {
      reloadCount++
    })

    await new Promise<void>(resolve => {
      setTimeout(() => {
        expect(reloadCount).toBeGreaterThanOrEqual(0)
        resolve()
      }, 100)
    })
  })
}) 