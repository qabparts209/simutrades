from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import get_current_user
from app.integrations.slack import SlackIntegration
from app.integrations.discord import DiscordIntegration

router = APIRouter()

@router.post("/join")
async def join_community(
    platform: str,
    user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        if platform == "slack":
            slack = SlackIntegration()
            await slack.send_welcome_message(user.id, user.username)
        elif platform == "discord":
            discord = DiscordIntegration()
            await discord.send_welcome_message(user.id, user.username)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 