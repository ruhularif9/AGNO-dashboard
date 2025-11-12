from fastapi import APIRouter, HTTPException
from typing import List
from backend.database import db
from pydantic import BaseModel, Field

router = APIRouter(tags=["Dashboard"])

# -----------------------------
# Pydantic Schemas
# -----------------------------
class DashboardStatsSchema(BaseModel):
    activeUsers: int
    revenue: float
    newSignups: int
    userGrowth: int
    revenueGrowth: float

class ChartDataPointSchema(BaseModel):
    name: str
    value: float

# -----------------------------
# Helper Functions
# -----------------------------
async def get_dashboard_stats() -> DashboardStatsSchema:
    stats_doc = await db.dashboard_stats.find_one({})
    if not stats_doc:
        return DashboardStatsSchema(
            activeUsers=0, revenue=0.0, newSignups=0, userGrowth=0, revenueGrowth=0.0
        )
    return DashboardStatsSchema(
        activeUsers=int(stats_doc.get("activeUsers", 0)),
        revenue=float(stats_doc.get("revenue", 0.0)),
        newSignups=int(stats_doc.get("newSignups", 0)),
        userGrowth=int(stats_doc.get("userGrowth", 0)),
        revenueGrowth=float(stats_doc.get("revenueGrowth", 0.0)),
    )

async def get_chart_data(collection_name: str) -> List[ChartDataPointSchema]:
    cursor = db[collection_name].find({})
    data = []
    async for doc in cursor:
        name = doc.get("name") or doc.get("month") or "Unknown"
        value = float(doc.get("value", 0.0))
        data.append(ChartDataPointSchema(name=name, value=value))
    return data

# -----------------------------
# Routes
# -----------------------------
@router.get("/stats", response_model=DashboardStatsSchema)
async def get_dashboard_statistics():
    return await get_dashboard_stats()

@router.get("/user-growth", response_model=List[ChartDataPointSchema])
async def get_user_growth_chart():
    return await get_chart_data("user_growth")

@router.get("/revenue-growth", response_model=List[ChartDataPointSchema])
async def get_revenue_growth_chart():
    return await get_chart_data("revenue_growth")

# -----------------------------
# Add or increment dashboard stats
# -----------------------------
@router.post("/add", response_model=DashboardStatsSchema)
async def add_dashboard_data(data: DashboardStatsSchema):
    try:
        # Fetch existing stats
        stats_doc = await db.dashboard_stats.find_one({})

        if stats_doc:
            # Increment existing stats
            updated_stats = {
                "activeUsers": stats_doc.get("activeUsers", 0) + data.activeUsers,
                "revenue": stats_doc.get("revenue", 0.0) + data.revenue,
                "newSignups": stats_doc.get("newSignups", 0) + data.newSignups,
                "userGrowth": data.userGrowth,       # growth can be overwritten or recalculated
                "revenueGrowth": data.revenueGrowth, # growth can be overwritten or recalculated
            }
            await db.dashboard_stats.update_one({}, {"$set": updated_stats})
        else:
            # Insert new stats document
            await db.dashboard_stats.insert_one(data.dict())

        # Update chart collections for history
        await db.user_growth.insert_one({"name": "Latest", "value": data.activeUsers})
        await db.revenue_growth.insert_one({"name": "Latest", "value": data.revenue})

        # Return updated dashboard stats
        return await get_dashboard_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving dashboard data: {str(e)}")

@router.get("/test-stats")
async def test_dashboard_stats():
    doc = await db.dashboard_stats.find_one({})
    return doc or {
        "activeUsers": 0,
        "revenue": 0.0,
        "newSignups": 0,
        "userGrowth": 0,
        "revenueGrowth": 0
    }
