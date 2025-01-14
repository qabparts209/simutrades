from datetime import datetime
from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog

class AuditLogger:
    def __init__(self, db: Session):
        self.db = db

    async def log_action(
        self,
        user_id: str,
        action: str,
        resource_type: str,
        resource_id: str,
        details: dict
    ):
        log = AuditLog(
            user_id=user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            details=details,
            timestamp=datetime.utcnow()
        )
        self.db.add(log)
        await self.db.commit()
        return log 