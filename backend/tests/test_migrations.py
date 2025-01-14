import pytest
from alembic.config import Config
from alembic import command
from sqlalchemy import text
from app.db.session import engine

@pytest.fixture
async def test_db():
    """Create test database and apply migrations"""
    config = Config("alembic.ini")
    
    # Apply all migrations
    command.upgrade(config, "head")
    
    yield engine
    
    # Rollback all migrations
    command.downgrade(config, "base")

async def test_migration_rollback(test_db):
    """Test migration rollback functionality"""
    # Apply specific migration
    config = Config("alembic.ini")
    command.upgrade(config, "+1")
    
    # Verify migration applied
    async with test_db.connect() as conn:
        result = await conn.execute(text("SELECT * FROM alembic_version"))
        version = result.scalar()
        assert version is not None
        
    # Rollback migration
    command.downgrade(config, "-1")
    
    # Verify rollback successful
    async with test_db.connect() as conn:
        result = await conn.execute(text("SELECT * FROM alembic_version"))
        version = result.scalar()
        assert version is None

async def test_seed_data(test_db):
    """Test seed data loading"""
    from app.db.init_db import init_db
    
    await init_db()
    
    async with test_db.connect() as conn:
        # Verify users table has seed data
        result = await conn.execute(text("SELECT COUNT(*) FROM users"))
        count = result.scalar()
        assert count > 0
        
        # Verify market data table has seed data
        result = await conn.execute(text("SELECT COUNT(*) FROM market_data"))
        count = result.scalar()
        assert count > 0 