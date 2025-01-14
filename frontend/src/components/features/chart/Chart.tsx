'use client'

import { useEffect, useRef } from 'react'

interface ChartProps {
  data?: any[] // Will be properly typed later
  width?: number
  height?: number
}

export function Chart({ data = [], width = 800, height = 500 }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Chart rendering logic will go here
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, width, height)

    // Placeholder text
    ctx.fillStyle = '#000'
    ctx.font = '14px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Chart Implementation Coming Soon', width / 2, height / 2)
  }, [data, width, height])

  return (
    <div className="w-full h-full bg-white shadow rounded-lg p-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full"
      />
    </div>
  )
} 