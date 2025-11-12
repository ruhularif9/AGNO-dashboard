from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid
import sys
import os

print("✅ chat.py loaded successfully")

# ------------------------------
# Ensure backend root is in sys.path
# ------------------------------
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.append(BACKEND_DIR)
    print(f"✅ Added backend directory to sys.path: {BACKEND_DIR}")

# ------------------------------
# Import AGNO Agent Helper
# ------------------------------
try:
    from backend.agno_agent import get_ai_response
    print("✅ Successfully imported get_ai_response from backend.agno_agent")
except Exception as e:
    print("❌ Error importing backend.agno_agent:", e)

# ------------------------------
# Router setup
# ------------------------------
router = APIRouter(prefix="/chat", tags=["Chat"])

# ------------------------------
# Models
# ------------------------------
class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    id: str
    sender: str  # "ai"
    content: str


# ------------------------------
# AI Chat Endpoint
# ------------------------------
@router.post("/", response_model=ChatResponse)
async def chat_ai(request: ChatRequest):
    """Main endpoint to handle AI chat messages."""
    print(f"💬 Chat endpoint hit with message: {request.message}")
    try:
        ai_reply = get_ai_response(request.message)
        print(f"🤖 AI replied with: {ai_reply}")
        return ChatResponse(
            id=str(uuid.uuid4()),
            sender="ai",
            content=ai_reply
        )
    except Exception as e:
        print("❌ Error inside chat_ai route:", e)
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")
