from sqlalchemy import Column, String, DateTime, ForeignKey
from app.db.base import TimestampedBase

class Subscription(TimestampedBase):
    __tablename__ = "subscriptions"

    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    plan = Column(String(50), nullable=False)  # free, intermediate, pro
    expires_at = Column(DateTime(timezone=True), nullable=False) 