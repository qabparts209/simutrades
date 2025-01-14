from typing import Any, Optional, Callable
from functools import wraps
import json
from app.core.redis import get_redis

class CacheManager:
    def __init__(self):
        self.redis = None
        
    async def get_redis(self):
        if not self.redis:
            self.redis = await get_redis()
        return self.redis
        
    async def get(self, key: str) -> Optional[Any]:
        redis = await self.get_redis()
        value = await redis.get(key)
        return json.loads(value) if value else None
        
    async def set(self, key: str, value: Any, expire: int = 3600):
        redis = await self.get_redis()
        await redis.set(key, json.dumps(value), ex=expire)
        
    async def delete(self, key: str):
        redis = await self.get_redis()
        await redis.delete(key)
        
    async def delete_pattern(self, pattern: str):
        redis = await self.get_redis()
        keys = await redis.keys(pattern)
        if keys:
            await redis.delete(*keys)
            
    def cached(self, prefix: str, expire: int = 3600):
        def decorator(func: Callable):
            @wraps(func)
            async def wrapper(*args, **kwargs):
                cache_key = f"{prefix}:{json.dumps(args)}:{json.dumps(kwargs)}"
                cached_value = await self.get(cache_key)
                
                if cached_value is not None:
                    return cached_value
                    
                result = await func(*args, **kwargs)
                await self.set(cache_key, result, expire)
                return result
            return wrapper
        return decorator 