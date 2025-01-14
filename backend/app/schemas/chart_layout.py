from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any

class ChartLayoutBase(BaseModel):
    name: str
    layout: Dict[str, Any]
    is_default: bool = False

class ChartLayoutCreate(ChartLayoutBase):
    user_id: str

class ChartLayout(ChartLayoutBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True 