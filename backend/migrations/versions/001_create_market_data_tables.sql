-- Create hypertable for market data
CREATE TABLE market_data (
    time TIMESTAMPTZ NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    price DECIMAL(18,8) NOT NULL,
    volume DECIMAL(18,8) NOT NULL,
    market_type VARCHAR(10) NOT NULL, -- 'stock', 'future', 'forex', 'crypto'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Convert to hypertable
SELECT create_hypertable('market_data', 'time');

-- Create indexes
CREATE INDEX idx_market_data_symbol ON market_data (symbol, time DESC);
CREATE INDEX idx_market_data_market_type ON market_data (market_type, time DESC);

-- Set up compression
ALTER TABLE market_data SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'symbol,market_type'
);

-- Add compression policy
SELECT add_compression_policy('market_data', INTERVAL '7 days'); 