from backend import agno_agent
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import chat, dashboard
from .database import db  # use relative import to avoid Render import issues
import os

app = FastAPI(title="AGNO OS Dashboard API")

# -------------------------
# CORS Configuration
# -------------------------
# Allow local dev + deployed frontend URL (Vercel)
frontend_origin = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        frontend_origin,  # Add Vercel frontend URL dynamically
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Include Routers
# -------------------------
app.include_router(chat.router, prefix="/api/chat", tags=["AI Chat"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard Stats & Charts"])

# -------------------------
# Root Endpoint
# -------------------------
@app.get("/")
async def root():
    return {"message": "AGNO OS Backend Running"}

# -------------------------
# Test DB Connection
# -------------------------
@app.get("/test-db")
async def test_db():
    """Check if MongoDB dashboard_stats collection is connected."""
    stats_doc = await db.dashboard_stats.find_one({})
    if stats_doc:
        stats_doc.pop("_id", None)  # remove internal MongoDB ID for cleaner response
        return stats_doc
    # Return default zero values if no document exists
    return {
        "activeUsers": 0,
        "revenue": 0.0,
        "newSignups": 0,
        "userGrowth": 0,
        "revenueGrowth": 0.0
    }

# -------------------------
# Test Dashboard Document
# -------------------------
@app.get("/api/test-dashboard-doc")
async def test_dashboard_doc():
    """Fetch raw dashboard stats document from MongoDB."""
    doc = await db.dashboard_stats.find_one({})
    if doc:
        doc["_id"] = str(doc["_id"])  # convert ObjectId to string for frontend
    return doc or {
        "activeUsers": 0,
        "revenue": 0.0,
        "newSignups": 0,
        "userGrowth": 0,
        "revenueGrowth": 0.0
    }
