from enum import Enum
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.incident import Incident
from app.core.notifications import NotificationManager

class IncidentSeverity(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class EmergencyProcedures:
    def __init__(self, db: Session, notifications: NotificationManager):
        self.db = db
        self.notifications = notifications

    async def report_incident(
        self,
        title: str,
        description: str,
        severity: IncidentSeverity,
        affected_systems: list[str]
    ):
        incident = Incident(
            title=title,
            description=description,
            severity=severity.value,
            affected_systems=affected_systems,
            reported_at=datetime.utcnow(),
            status="open"
        )
        self.db.add(incident)
        await self.db.commit()
        
        # Notify relevant teams
        await self.notifications.send_incident_alert(incident)
        return incident

    async def update_incident(self, incident_id: str, status: str, resolution: str = None):
        incident = self.db.query(Incident).get(incident_id)
        incident.status = status
        incident.resolution = resolution
        incident.updated_at = datetime.utcnow()
        
        await self.db.commit()
        await self.notifications.send_incident_update(incident)
        return incident 