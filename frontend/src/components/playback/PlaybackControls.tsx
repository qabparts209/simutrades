import React from 'react'

interface PlaybackControlsProps {
    isPlaying: boolean
    currentTime: number
    duration: number
    speed: number
    onPlay: () => void
    onPause: () => void
    onSeek: (time: number) => void
    onSpeedChange: (speed: number) => void
}

export function PlaybackControls({
    isPlaying,
    currentTime,
    duration,
    speed,
    onPlay,
    onPause,
    onSeek,
    onSpeedChange
}: PlaybackControlsProps) {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={isPlaying ? onPause : onPlay}
                aria-label={isPlaying ? 'pause' : 'play'}
            >
                {isPlaying ? '⏸' : '▶'}
            </button>
            
            <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => onSeek(Number(e.target.value))}
            />
            
            <select
                value={speed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
            >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>
            </select>
        </div>
    )
}
