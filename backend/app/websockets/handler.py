from fastapi import WebSocket
from typing import Dict, List
import json
from app.core.config import settings

class WebSocketManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}
        
    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        if client_id not in self.active_connections:
            self.active_connections[client_id] = []
        self.active_connections[client_id].append(websocket)
        
    async def disconnect(self, websocket: WebSocket, client_id: str):
        self.active_connections[client_id].remove(websocket)
        
    async def broadcast(self, message: str, client_id: str = None):
        if client_id:
            connections = self.active_connections.get(client_id, [])
        else:
            connections = [
                conn 
                for conns in self.active_connections.values() 
                for conn in conns
            ]
            
        for connection in connections:
            await connection.send_text(message)

ws_manager = WebSocketManager() 