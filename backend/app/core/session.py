from fastapi import Request, HTTPException
from app.core.redis import get_redis
import uuid
from datetime import datetime, timedelta

class SessionManager:
    def __init__(self, redis_client):
        self.redis = redis_client
        self.session_duration = timedelta(hours=24)

    async def create_session(self, user_id: str) -> str:
        session_id = str(uuid.uuid4())
        session_data = {
            "user_id": user_id,
            "created_at": datetime.utcnow().isoformat(),
            "expires_at": (datetime.utcnow() + self.session_duration).isoformat()
        }
        await self.redis.hmset(f"session:{session_id}", session_data)
        await self.redis.expire(f"session:{session_id}", int(self.session_duration.total_seconds()))
        return session_id

    async def get_session(self, session_id: str) -> dict:
        session = await self.redis.hgetall(f"session:{session_id}")
        if not session:
            raise HTTPException(status_code=401, detail="Invalid session")
        return session

    async def delete_session(self, session_id: str):
        await self.redis.delete(f"session:{session_id}") 