from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.user_consent import UserConsent
from app.core.config import settings

class PrivacyManager:
    def __init__(self, db: Session):
        self.db = db
        self.retention_period = timedelta(days=settings.DATA_RETENTION_DAYS)

    async def record_user_consent(self, user_id: str, consent_type: str):
        consent = UserConsent(
            user_id=user_id,
            consent_type=consent_type,
            granted_at=datetime.utcnow()
        )
        self.db.add(consent)
        await self.db.commit()
        return consent

    async def cleanup_old_data(self):
        cutoff_date = datetime.utcnow() - self.retention_period
        # Implement data cleanup logic here 