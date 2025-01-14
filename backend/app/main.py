from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings

app = FastAPI(
    title="SimuTrades Backend",
    description="Backend API for SimuTrades platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return JSONResponse({"status": "healthy"})

@app.get("/api/v1")
async def root():
    """API root endpoint"""
    return JSONResponse({
        "message": "Welcome to SimuTrades API",
        "version": "1.0.0",
        "status": "operational"
    }) 