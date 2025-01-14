import aioredis
from app.core.config import settings

async def init_redis_pool():
    """Initialize Redis connection pool"""
    redis = await aioredis.from_url(
        f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}",
        encoding="utf-8",
        decode_responses=True
    )
    return redis

async def get_redis():
    """Get Redis connection from pool"""
    if not hasattr(get_redis, "redis"):
        get_redis.redis = await init_redis_pool()
    return get_redis.redis 