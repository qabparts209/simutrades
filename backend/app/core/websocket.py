from fastapi import WebSocket
from typing import Dict, Set
import json
import asyncio
from app.core.redis import get_redis

class WebSocketManager:
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        self.redis = None
        
    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        if client_id not in self.active_connections:
            self.active_connections[client_id] = set()
        self.active_connections[client_id].add(websocket)
        
        if not self.redis:
            self.redis = await get_redis()
        
        # Subscribe to Redis channels
        pubsub = self.redis.pubsub()
        await pubsub.subscribe(f"user:{client_id}")
        
        try:
            while True:
                message = await pubsub.get_message(ignore_subscribe_messages=True)
                if message:
                    await self.broadcast_to_user(client_id, message["data"])
                await asyncio.sleep(0.01)
        except Exception as e:
            await self.disconnect(websocket, client_id)
            
    async def disconnect(self, websocket: WebSocket, client_id: str):
        self.active_connections[client_id].remove(websocket)
        if not self.active_connections[client_id]:
            del self.active_connections[client_id]
            
    async def broadcast_to_user(self, client_id: str, message: str):
        if client_id in self.active_connections:
            for connection in self.active_connections[client_id]:
                try:
                    await connection.send_text(message)
                except Exception:
                    await self.disconnect(connection, client_id) 