# backend/database.py
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI") or "mongodb://localhost:27017"

if not MONGO_URI:
    raise ValueError("❌ Missing MONGO_URI in .env file")

# Create Async MongoDB client
client = AsyncIOMotorClient(MONGO_URI)

# Use or create database
db = client.agno_db  # database name

# Optional: helper function to test connection
async def test_db_connection():
    try:
        await client.admin.command("ping")
        print("✅ MongoDB connection successful")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)
