from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SubscriptionBase(BaseModel):
    plan: str
    expires_at: datetime

class SubscriptionCreate(SubscriptionBase):
    user_id: str

class Subscription(SubscriptionBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True 