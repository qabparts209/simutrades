from enum import Enum
from typing import Any
import httpx
from app.core.config import settings

class NotificationChannel(Enum):
    SLACK = "slack"
    EMAIL = "email"
    PAGERDUTY = "pagerduty"

class NotificationManager:
    def __init__(self):
        self.slack_webhook = settings.SLACK_WEBHOOK_URL
        self.pagerduty_key = settings.PAGERDUTY_API_KEY

    async def send_incident_alert(self, incident: Any):
        # Send to Slack
        await self._send_to_slack({
            "text": f"🚨 New Incident: {incident.title}",
            "severity": incident.severity,
            "description": incident.description
        })

        # Send to PagerDuty if critical
        if incident.severity == "critical":
            await self._send_to_pagerduty(incident)

    async def _send_to_slack(self, message: dict):
        async with httpx.AsyncClient() as client:
            await client.post(self.slack_webhook, json=message)

    async def _send_to_pagerduty(self, incident: Any):
        # PagerDuty integration implementation
        pass 