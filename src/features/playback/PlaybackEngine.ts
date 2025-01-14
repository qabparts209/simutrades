import { MarketData, TimeFrame } from '../../types/market'
import { EventEmitter } from '../../utils/events'
import { WebWorker } from '../../utils/worker'

interface PlaybackStatus {
    isPlaying: boolean
    currentTime: number
    duration: number
    speed: number
    progress: number
    isBuffering: boolean
    hasError: boolean
    errorMessage?: string
    currentSession: SessionType
}

type SessionType = 'pre' | 'regular' | 'post' | 'closed'
type PlaybackCallback = () => void
type ErrorCallback = (error: Error) => void
type DataCallback = (data: MarketData) => void

interface PlaybackOptions {
    bufferSize?: number
    loop?: boolean
    speedPresets?: number[]
    timeframe?: TimeFrame
    timezone?: string
    useWorker?: boolean
    compression?: boolean
}

interface SessionConfig {
    preMarket: { start: number; end: number }
    regular: { start: number; end: number }
    afterHours: { start: number; end: number }
    timezone: string
}

interface Signal {
    timestamp: number
    type: string
    data: any
    priority: number
}

interface MarketEvent {
    timestamp: number
    type: string
    data: any
}

export class PlaybackEngine extends EventEmitter {
    private data: MarketData[] = []
    private currentIndex = 0
    private isPlaying = false
    private speed = 1
    private worker?: WebWorker
    private signals: Signal[] = []
    private events: MarketEvent[] = []
    private lastTimestamp = 0
    private frameId?: number
    private bufferSize: number
    private useCompression: boolean

    private sessionConfig: SessionConfig = {
        preMarket: { start: 4 * 60 * 60 * 1000, end: 9.5 * 60 * 60 * 1000 },
        regular: { start: 9.5 * 60 * 60 * 1000, end: 16 * 60 * 60 * 1000 },
        afterHours: { start: 16 * 60 * 60 * 1000, end: 20 * 60 * 60 * 1000 },
        timezone: 'America/New_York'
    }

    constructor(options: PlaybackOptions = {}) {
        super()
        this.bufferSize = options.bufferSize || 1000
        this.useCompression = options.compression || false

        if (options.useWorker) {
            this.initWorker()
        }
    }

    // Core Playback Controls
    play(): void {
        if (!this.hasData()) return
        this.isPlaying = true
        this.startPlayback()
        this.emit('play')
    }

    pause(): void {
        this.isPlaying = false
        if (this.frameId) {
            cancelAnimationFrame(this.frameId)
        }
        this.emit('pause')
    }

    stop(): void {
        this.pause()
        this.currentIndex = 0
        this.emit('stop')
    }

    setSpeed(speed: number): void {
        this.speed = speed
        this.emit('speedChange', speed)
    }

    // Data Management
    loadData(data: MarketData[]): void {
        this.data = this.useCompression ? this.compressData(data) : data
        this.lastTimestamp = data[data.length - 1]?.timestamp || 0
        this.emit('dataLoaded')
    }

    addSignals(signals: Signal[]): void {
        this.signals = [...signals].sort((a, b) => 
            a.timestamp - b.timestamp || b.priority - a.priority
        )
    }

    addMarketEvents(events: MarketEvent[]): void {
        this.events = [...events].sort((a, b) => a.timestamp - b.timestamp)
    }

    // Navigation
    seekTo(timestamp: number): void {
        const index = this.findIndexForTimestamp(timestamp)
        if (index !== -1) {
            this.currentIndex = index
            this.emit('seek', timestamp)
        }
    }

    goToNextSignal(type?: string): boolean {
        const currentTime = this.getCurrentTime()
        const nextSignal = this.signals.find(s => 
            s.timestamp > currentTime && (!type || s.type === type)
        )
        
        if (nextSignal) {
            this.seekTo(nextSignal.timestamp)
            return true
        }
        return false
    }

    goToNextEvent(type?: string): boolean {
        const currentTime = this.getCurrentTime()
        const nextEvent = this.events.find(e => 
            e.timestamp > currentTime && (!type || e.type === type)
        )
        
        if (nextEvent) {
            this.seekTo(nextEvent.timestamp)
            return true
        }
        return false
    }

    // Session Management
    setSessionConfig(config: Partial<SessionConfig>): void {
        this.sessionConfig = { ...this.sessionConfig, ...config }
        this.emit('sessionConfigChange', this.sessionConfig)
    }

    getCurrentSession(): SessionType {
        const time = this.getCurrentDayTime()
        const { preMarket, regular, afterHours } = this.sessionConfig
        
        if (time >= preMarket.start && time < preMarket.end) return 'pre'
        if (time >= regular.start && time < regular.end) return 'regular'
        if (time >= afterHours.start && time < afterHours.end) return 'post'
        return 'closed'
    }

    // Status & Information
    getStatus(): PlaybackStatus {
        return {
            isPlaying: this.isPlaying,
            currentTime: this.getCurrentTime(),
            duration: this.getDuration(),
            speed: this.speed,
            progress: this.getProgress(),
            isBuffering: false,
            hasError: false,
            currentSession: this.getCurrentSession()
        }
    }

    // Private Methods
    private startPlayback(): void {
        const loop = () => {
            if (!this.isPlaying) return
            
            if (this.currentIndex < this.data.length) {
                this.processCurrentFrame()
                this.frameId = requestAnimationFrame(loop)
            } else {
                this.emit('complete')
                this.pause()
            }
        }
        
        this.frameId = requestAnimationFrame(loop)
    }

    private processCurrentFrame(): void {
        const currentData = this.data[this.currentIndex]
        this.emit('frame', currentData)
        this.currentIndex += this.speed
    }

    private getCurrentTime(): number {
        return this.data[this.currentIndex]?.timestamp || 0
    }

    private getDuration(): number {
        return this.lastTimestamp - this.data[0]?.timestamp || 0
    }

    private getProgress(): number {
        return this.currentIndex / (this.data.length - 1)
    }

    private getCurrentDayTime(): number {
        const date = new Date(this.getCurrentTime())
        return date.getHours() * 3600000 + 
               date.getMinutes() * 60000 + 
               date.getSeconds() * 1000
    }

    private hasData(): boolean {
        return this.data.length > 0
    }

    private findIndexForTimestamp(timestamp: number): number {
        return this.data.findIndex(d => d.timestamp >= timestamp)
    }

    private compressData(data: MarketData[]): MarketData[] {
        // Implement data compression if needed
        return data
    }

    private initWorker(): void {
        // Initialize WebWorker for heavy computations if needed
    }

    // Cleanup
    destroy(): void {
        this.pause()
        this.worker?.terminate()
        this.removeAllListeners()
    }
} 