import { useEffect, useRef } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'
import { useTranslation } from 'react-i18next'

export const ChartDemo = () => {
  const { t } = useTranslation()
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { color: '#1B1B1D' },
          textColor: '#DDD'
        },
        grid: {
          vertLines: { color: '#2B2B2D' },
          horzLines: { color: '#2B2B2D' }
        }
      })

      const candlestickSeries = chartRef.current.addCandlestickSeries()
      candlestickSeries.setData([
        { time: '2023-01-01', open: 150, high: 155, low: 148, close: 153 },
        { time: '2023-01-02', open: 153, high: 158, low: 152, close: 157 },
        // Add more demo data...
      ])

      return () => {
        if (chartRef.current) {
          chartRef.current.remove()
        }
      }
    }
  }, [])

  return (
    <div className="rounded-lg overflow-hidden">
      <div ref={chartContainerRef} className="w-full" />
    </div>
  )
} 