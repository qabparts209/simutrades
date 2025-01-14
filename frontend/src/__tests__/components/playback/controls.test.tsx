import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { PlaybackControls } from '@/components/playback/PlaybackControls'

describe('Playback Controls', () => {
    const mockOnPlay = jest.fn()
    const mockOnPause = jest.fn()
    const mockOnSeek = jest.fn()
    const mockOnSpeedChange = jest.fn()

    beforeEach(() => {
        act(() => {
            render(
                <PlaybackControls
                    isPlaying={false}
                    currentTime={1000}
                    duration={3000}
                    speed={1}
                    onPlay={mockOnPlay}
                    onPause={mockOnPause}
                    onSeek={mockOnSeek}
                    onSpeedChange={mockOnSpeedChange}
                />
            )
        })
    })

    it('renders play/pause button', () => {
        const playButton = screen.getByRole('button', { name: /play/i })
        expect(playButton).toBeInTheDocument()
        
        act(() => {
            fireEvent.click(playButton)
        })
        expect(mockOnPlay).toHaveBeenCalled()
    })

    it('renders time slider', () => {
        const slider = screen.getByRole('slider')
        expect(slider).toBeInTheDocument()
        
        act(() => {
            fireEvent.change(slider, { target: { value: '2000' } })
        })
        expect(mockOnSeek).toHaveBeenCalledWith(2000)
    })

    it('renders speed selector', () => {
        const speedSelect = screen.getByRole('combobox')
        expect(speedSelect).toBeInTheDocument()
        
        act(() => {
            fireEvent.change(speedSelect, { target: { value: '2' } })
        })
        expect(mockOnSpeedChange).toHaveBeenCalledWith(2)
    })
})
