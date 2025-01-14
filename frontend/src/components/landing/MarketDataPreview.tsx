import { useEffect, useRef } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const demoData = [
  { time: '9:30', price: 150 },
  { time: '10:00', price: 153 },
  { time: '10:30', price: 157 },
  { time: '11:00', price: 155 },
  { time: '11:30', price: 160 },
  { time: '12:00', price: 158 },
  { time: '12:30', price: 162 },
  { time: '13:00', price: 165 },
  { time: '13:30', price: 168 },
  { time: '14:00', price: 170 },
]

export const MarketDataPreview = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-white text-xl mb-4">Live Market Preview</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={demoData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white'
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 