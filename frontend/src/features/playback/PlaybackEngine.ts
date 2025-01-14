import { MarketData } from '@/types/market'

interface PlaybackStatus {
    isPlaying: boolean
    currentTime: number
    duration: number
    speed: number
}

export class PlaybackEngine {
    private data: MarketData[] = []
    private currentIndex = 0
    private _isPlaying = false
    private _playbackSpeed = 1
    private timeoutId?: NodeJS.Timeout
    private dataPointCallbacks: ((data: MarketData) => void)[] = []
    private statusChangeCallbacks: ((status: PlaybackStatus) => void)[] = []

    loadData(data: MarketData[]) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Invalid market data')
        }

        this.cleanup() // Clean up before loading new data
        this.data = [...data].sort((a, b) => a.timestamp - b.timestamp)
        this.currentIndex = 0
        this.emitStatusChange()
        return this.data
    }

    start() {
        if (!this.data.length) {
            throw new Error('No data loaded')
        }
        this.currentIndex = 0
        this._isPlaying = true
        this.emitStatusChange()
        this.emitCurrentDataPoint()
        this.scheduleNextPlayback()
    }

    pause() {
        this._isPlaying = false
        this.cleanup()
        this.emitStatusChange()
    }

    seekTo(timestamp: number) {
        if (!this.data.length) {
            throw new Error('No data loaded')
        }
        if (timestamp < this.startTime || timestamp > this.endTime) {
            throw new Error('Timestamp out of range')
        }

        const index = this.data.findIndex(d => d.timestamp >= timestamp)
        if (index !== -1) {
            this.currentIndex = index
            this.emitStatusChange()
            this.emitCurrentDataPoint()
        }
    }

    setSpeed(speed: number) {
        if (speed <= 0 || speed > 32) {
            throw new Error('Invalid playback speed')
        }
        const wasPlaying = this._isPlaying
        if (wasPlaying) {
            this.pause()
        }
        this._playbackSpeed = speed
        this.emitStatusChange()
        if (wasPlaying) {
            this.start()
        }
    }

    onDataPoint(callback: (data: MarketData) => void) {
        this.dataPointCallbacks.push(callback)
        return () => {
            const index = this.dataPointCallbacks.indexOf(callback)
            if (index > -1) {
                this.dataPointCallbacks.splice(index, 1)
            }
        }
    }

    onStatusChange(callback: (status: PlaybackStatus) => void) {
        this.statusChangeCallbacks.push(callback)
        return () => {
            const index = this.statusChangeCallbacks.indexOf(callback)
            if (index > -1) {
                this.statusChangeCallbacks.splice(index, 1)
            }
        }
    }

    cleanup() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = undefined
        }
        this._isPlaying = false
    }

    private emitStatusChange() {
        const status: PlaybackStatus = {
            isPlaying: this._isPlaying,
            currentTime: this.currentTime,
            duration: this.duration,
            speed: this._playbackSpeed
        }
        this.statusChangeCallbacks.forEach(cb => cb(status))
    }

    private emitCurrentDataPoint() {
        if (this.currentIndex < this.data.length) {
            const currentData = this.data[this.currentIndex]
            this.dataPointCallbacks.forEach(cb => cb(currentData))
        }
    }

    private scheduleNextPlayback() {
        if (this._isPlaying && this.currentIndex < this.data.length) {
            this.timeoutId = setTimeout(() => {
                this.emitCurrentDataPoint()
                this.currentIndex++
                
                if (this.currentIndex >= this.data.length) {
                    this.cleanup()
                    this.emitStatusChange()
                } else {
                    this.emitStatusChange()
                    this.scheduleNextPlayback()
                }
            }, 1000 / this._playbackSpeed)
        }
    }

    get currentTime() {
        return this.data[this.currentIndex]?.timestamp ?? 0
    }

    get isPlaying() {
        return this._isPlaying
    }

    get playbackSpeed() {
        return this._playbackSpeed
    }

    get duration() {
        return this.data.length > 0 ? this.endTime - this.startTime : 0
    }

    get startTime() {
        return this.data[0]?.timestamp ?? 0
    }

    get endTime() {
        return this.data[this.data.length - 1]?.timestamp ?? 0
    }
}
