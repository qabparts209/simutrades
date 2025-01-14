from sqlalchemy import Column, String, JSON, ForeignKey, Boolean
from app.db.base import TimestampedBase

class ChartLayout(TimestampedBase):
    __tablename__ = "chart_layouts"

    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    layout = Column(JSON, nullable=False)
    is_default = Column(Boolean(), default=False) 