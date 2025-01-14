from sqlalchemy import Column, DateTime, String, Numeric
from app.db.base import TimestampedBase

class MarketData(TimestampedBase):
    __tablename__ = "market_data"
    
    timestamp = Column(DateTime(timezone=True), primary_key=True)
    symbol = Column(String(20), primary_key=True)
    open = Column(Numeric(18, 8), nullable=False)
    high = Column(Numeric(18, 8), nullable=False)
    low = Column(Numeric(18, 8), nullable=False)
    close = Column(Numeric(18, 8), nullable=False)
    volume = Column(Numeric(18, 8), nullable=False) 