import { render, screen } from '@testing-library/react'
import { PlaybackEngine } from '@/features/playback/PlaybackEngine'
import { MarketData } from '@/types/market'

describe('Playback Engine', () => {
    let playbackEngine: PlaybackEngine
    const mockMarketData: MarketData[] = [
        { timestamp: 1000, price: 100, volume: 1000 },
        { timestamp: 2000, price: 101, volume: 1500 },
        { timestamp: 3000, price: 99, volume: 2000 }
    ]

    beforeEach(() => {
        playbackEngine = new PlaybackEngine()
    })

    describe('Data Loading', () => {
        it('loads historical data in correct format', () => {
            const result = playbackEngine.loadData(mockMarketData)
            expect(result.length).toBe(mockMarketData.length)
            expect(result[0]).toHaveProperty('timestamp')
            expect(result[0]).toHaveProperty('price')
            expect(result[0]).toHaveProperty('volume')
        })

        it('sorts data by timestamp', () => {
            const unsortedData = [
                { timestamp: 3000, price: 99, volume: 2000 },
                { timestamp: 1000, price: 100, volume: 1000 },
                { timestamp: 2000, price: 101, volume: 1500 }
            ]
            const result = playbackEngine.loadData(unsortedData)
            expect(result[0].timestamp).toBe(1000)
            expect(result[1].timestamp).toBe(2000)
            expect(result[2].timestamp).toBe(3000)
        })
    })

    describe('Playback Controls', () => {
        it('starts playback from beginning', () => {
            playbackEngine.loadData(mockMarketData)
            playbackEngine.start()
            expect(playbackEngine.currentTime).toBe(1000)
            expect(playbackEngine.isPlaying).toBe(true)
        })

        it('pauses playback', () => {
            playbackEngine.loadData(mockMarketData)
            playbackEngine.start()
            playbackEngine.pause()
            expect(playbackEngine.isPlaying).toBe(false)
        })

        it('seeks to specific timestamp', () => {
            playbackEngine.loadData(mockMarketData)
            playbackEngine.seekTo(2000)
            expect(playbackEngine.currentTime).toBe(2000)
        })

        it('adjusts playback speed', () => {
            playbackEngine.loadData(mockMarketData)
            playbackEngine.setSpeed(2)
            expect(playbackEngine.playbackSpeed).toBe(2)
        })
    })

    describe('Event Emission', () => {
        it('emits data points during playback', (done) => {
            playbackEngine.loadData(mockMarketData)
            playbackEngine.onDataPoint((data) => {
                expect(data).toHaveProperty('timestamp')
                expect(data).toHaveProperty('price')
                expect(data).toHaveProperty('volume')
                done()
            })
            playbackEngine.start()
        })

        it('emits playback status changes', (done) => {
            playbackEngine.loadData(mockMarketData)
            playbackEngine.onStatusChange((status) => {
                expect(status.isPlaying).toBeDefined()
                expect(status.currentTime).toBeDefined()
                done()
            })
            playbackEngine.start()
        })
    })
})
