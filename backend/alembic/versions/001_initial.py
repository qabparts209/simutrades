"""initial

Revision ID: 001
Revises: 
Create Date: 2023-12-01 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Create TimescaleDB extension
    op.execute('CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE')
    
    # Create market_data hypertable
    op.create_table(
        'market_data',
        sa.Column('timestamp', sa.DateTime(timezone=True), nullable=False),
        sa.Column('symbol', sa.String(length=20), nullable=False),
        sa.Column('open', sa.Numeric(precision=18, scale=8), nullable=False),
        sa.Column('high', sa.Numeric(precision=18, scale=8), nullable=False),
        sa.Column('low', sa.Numeric(precision=18, scale=8), nullable=False),
        sa.Column('close', sa.Numeric(precision=18, scale=8), nullable=False),
        sa.Column('volume', sa.Numeric(precision=18, scale=8), nullable=False),
    )
    
    # Convert to hypertable
    op.execute(
        "SELECT create_hypertable('market_data', 'timestamp', chunk_time_interval => INTERVAL '1 day')"
    )
    
    # Create index on symbol and timestamp
    op.create_index(
        'idx_market_data_symbol_timestamp',
        'market_data',
        ['symbol', 'timestamp']
    )

def downgrade() -> None:
    op.drop_index('idx_market_data_symbol_timestamp')
    op.drop_table('market_data')
    op.execute('DROP EXTENSION IF EXISTS timescaledb CASCADE') 