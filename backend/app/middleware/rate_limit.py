from fastapi import Request, HTTPException
import time
from app.core.redis import get_redis

async def rate_limit_middleware(request: Request, call_next):
    redis = await get_redis()
    client_ip = request.client.host
    key = f"rate_limit:{client_ip}"
    
    # Allow 100 requests per minute
    if await redis.incr(key) > 100:
        raise HTTPException(status_code=429, detail="Too many requests")
    
    await redis.expire(key, 60)
    response = await call_next(request)
    return response 