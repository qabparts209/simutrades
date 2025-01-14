import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)

def test_cors_headers():
    """Test CORS headers are properly set"""
    headers = {
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
    }
    
    response = client.options("/api/v1/auth/login", headers=headers)
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"
    assert response.headers["access-control-allow-methods"] == "POST"
    assert "content-type" in response.headers["access-control-allow-headers"].lower()

def test_cors_unauthorized_origin():
    """Test unauthorized origins are blocked"""
    headers = {
        "Origin": "http://malicious-site.com",
    }
    
    response = client.options("/api/v1/auth/login", headers=headers)
    assert response.status_code == 400 