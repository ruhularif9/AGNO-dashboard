from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid
import sys
import os

print("✅ chat.py loaded successfully")

# ------------------------------
# Add project root to import path (for agno_agent.py)
# ------------------------------
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
if ROOT_DIR not in sys.path:
    sys.path.append(ROOT_DIR)
    print("✅ Added project root to sys.path:", ROOT_DIR)

# ------------------------------
# Import AGNO Agent Helper
# ------------------------------
try:
    from agno_agent import get_ai_response
    print(" Successfully imported get_ai_response from agno_agent.py")
except Exception as e:
    print("Error importing agno_agent:", e)

# ------------------------------
# Router setup
# ------------------------------
router = APIRouter()

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
# AI Chat Endpoint (real AGNO integration)
# ------------------------------
@router.post("/", response_model=ChatResponse)
async def chat_ai(request: ChatRequest):
    print("Chat endpoint hit with message:", request.message)
    try:
        ai_reply = get_ai_response(request.message)
        print("AI replied with:", ai_reply)
        return ChatResponse(
            id=str(uuid.uuid4()),
            sender="ai",
            content=ai_reply
        )
    except Exception as e:
        print(" Error inside chat_ai route:", e)
        raise HTTPException(status_code=500, detail=str(e))
