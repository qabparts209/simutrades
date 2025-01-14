export interface MarketData {
    timestamp: number
    price: number
    volume: number
    open?: number
    high?: number
    low?: number
    close?: number
    bid?: number
    ask?: number
    vwap?: number
}

export type TimeFrame = 
    | '1s'  // 1 second
    | '5s'  // 5 seconds
    | '10s' // 10 seconds
    | '15s' // 15 seconds
    | '30s' // 30 seconds
    | '1m'  // 1 minute
    | '3m'  // 3 minutes
    | '5m'  // 5 minutes
    | '15m' // 15 minutes
    | '30m' // 30 minutes
    | '1h'  // 1 hour
    | '2h'  // 2 hours
    | '4h'  // 4 hours
    | '6h'  // 6 hours
    | '8h'  // 8 hours
    | '12h' // 12 hours
    | '1d'  // 1 day
    | '1w'  // 1 week
    | '1M'  // 1 month 