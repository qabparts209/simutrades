-- Efficient time-series data retrieval
CREATE OR REPLACE FUNCTION get_market_data(
    p_symbol TEXT,
    p_start_time TIMESTAMPTZ,
    p_end_time TIMESTAMPTZ,
    p_interval TEXT DEFAULT '1m'
)
RETURNS TABLE (
    timestamp TIMESTAMPTZ,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT time_bucket(p_interval::interval, m.timestamp) as timestamp,
           first(m.open, m.timestamp) as open,
           max(m.high) as high,
           min(m.low) as low,
           last(m.close, m.timestamp) as close,
           sum(m.volume) as volume
    FROM market_data m
    WHERE m.symbol = p_symbol
    AND m.timestamp BETWEEN p_start_time AND p_end_time
    GROUP BY 1
    ORDER BY 1;
END;
$$ LANGUAGE plpgsql;

-- Efficient chart layout retrieval
CREATE OR REPLACE FUNCTION get_user_chart_layout(
    p_user_id UUID,
    p_layout_id UUID DEFAULT NULL
)
RETURNS TABLE (
    layout_id UUID,
    layout_data JSONB,
    indicators JSONB,
    drawings JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cl.id as layout_id,
        cl.layout as layout_data,
        cl.indicators,
        cl.drawings
    FROM chart_layouts cl
    WHERE cl.user_id = p_user_id
    AND (p_layout_id IS NULL OR cl.id = p_layout_id)
    ORDER BY cl.is_default DESC, cl.updated_at DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql; 