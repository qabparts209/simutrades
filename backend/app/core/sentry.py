import sentry_sdk
from sentry_sdk.integrations.fastapi import FastAPIIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
from sentry_sdk.integrations.redis import RedisIntegration
from sentry_sdk.integrations.celery import CeleryIntegration
from app.core.config import settings

def init_sentry():
    sentry_sdk.init(
        dsn=settings.SENTRY_DSN,
        environment=settings.ENVIRONMENT,
        traces_sample_rate=1.0,
        
        # Integrations
        integrations=[
            FastAPIIntegration(),
            SqlalchemyIntegration(),
            RedisIntegration(),
            CeleryIntegration(),
        ],
        
        # Performance
        enable_tracing=True,
        profiles_sample_rate=1.0,
        
        # Session Replay
        enable_session_replay=True,
        
        # Custom Tags
        release=settings.VERSION,
    ) 