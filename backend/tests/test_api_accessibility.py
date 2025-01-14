import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_api_endpoints_availability():
    """Test all API endpoints are accessible"""
    endpoints = [
        "/api/v1/auth/login",
        "/api/v1/auth/register",
        "/api/v1/users/me",
        "/api/v1/market-data",
    ]
    
    for endpoint in endpoints:
        response = client.get(endpoint)
        assert response.status_code != 404

@pytest.mark.asyncio
async def test_authentication():
    """Test authentication flow"""
    # Register
    register_data = {
        "email": "test@example.com",
        "password": "testpass123"
    }
    response = client.post("/api/v1/auth/register", json=register_data)
    assert response.status_code == 201
    
    # Login
    login_data = {
        "username": "test@example.com",
        "password": "testpass123"
    }
    response = client.post("/api/v1/auth/login", data=login_data)
    assert response.status_code == 200
    assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_authorization():
    """Test authorization rules"""
    # Try accessing protected endpoint without token
    response = client.get("/api/v1/users/me")
    assert response.status_code == 401
    
    # Login and get token
    login_data = {
        "username": "test@example.com",
        "password": "testpass123"
    }
    response = client.post("/api/v1/auth/login", data=login_data)
    token = response.json()["access_token"]
    
    # Access protected endpoint with token
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/users/me", headers=headers)
    assert response.status_code == 200 