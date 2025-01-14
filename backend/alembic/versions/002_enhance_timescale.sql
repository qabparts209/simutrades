-- Asset-specific hypertables
CREATE TABLE market_data_stocks (
    LIKE market_data INCLUDING ALL,
    asset_type TEXT DEFAULT 'stock'
);
SELECT create_hypertable('market_data_stocks', 'timestamp');

CREATE TABLE market_data_futures (
    LIKE market_data INCLUDING ALL,
    asset_type TEXT DEFAULT 'futures'
);
SELECT create_hypertable('market_data_futures', 'timestamp');

CREATE TABLE market_data_forex (
    LIKE market_data INCLUDING ALL,
    asset_type TEXT DEFAULT 'forex'
);
SELECT create_hypertable('market_data_forex', 'timestamp');

CREATE TABLE market_data_crypto (
    LIKE market_data INCLUDING ALL,
    asset_type TEXT DEFAULT 'crypto'
);
SELECT create_hypertable('market_data_crypto', 'timestamp');

-- Compression Policies
SELECT add_compression_policy('market_data_stocks', INTERVAL '7 days');
SELECT add_compression_policy('market_data_futures', INTERVAL '7 days');
SELECT add_compression_policy('market_data_forex', INTERVAL '7 days');
SELECT add_compression_policy('market_data_crypto', INTERVAL '7 days');

-- Optimized Indexes
CREATE INDEX idx_stocks_symbol_time ON market_data_stocks (symbol, timestamp DESC);
CREATE INDEX idx_futures_symbol_time ON market_data_futures (symbol, timestamp DESC);
CREATE INDEX idx_forex_symbol_time ON market_data_forex (symbol, timestamp DESC);
CREATE INDEX idx_crypto_symbol_time ON market_data_crypto (symbol, timestamp DESC);

-- Continuous Aggregates for different timeframes
CREATE MATERIALIZED VIEW market_data_1h AS
SELECT 
    time_bucket('1 hour', timestamp) AS bucket,
    symbol,
    first(open, timestamp) as open,
    max(high) as high,
    min(low) as low,
    last(close, timestamp) as close,
    sum(volume) as volume
FROM market_data
GROUP BY bucket, symbol;

-- Retention Policies
SELECT add_retention_policy('market_data_stocks', INTERVAL '5 years');
SELECT add_retention_policy('market_data_futures', INTERVAL '5 years');
SELECT add_retention_policy('market_data_forex', INTERVAL '5 years');
SELECT add_retention_policy('market_data_crypto', INTERVAL '5 years');

-- Job for refreshing continuous aggregates
SELECT add_job('refresh_continuous_aggregate_policy', '1h',
    config => '{
        "mat_hypertable_name": "market_data_1h",
        "start_offset": "4h",
        "end_offset": "1h",
        "max_runtime": "5m"
    }'
); 