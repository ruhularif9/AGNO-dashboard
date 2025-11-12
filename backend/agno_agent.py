from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat
from agno.os import AgentOS
from agno.tools.mcp import MCPTools
from dotenv import load_dotenv
import os

# ------------------------------
# Load environment variables safely
# ------------------------------
# Check both backend/.env and project root .env
backend_env = os.path.join(os.path.dirname(__file__), ".env")
root_env = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")

if os.path.exists(backend_env):
    load_dotenv(backend_env)
    print(f"✅ Loaded environment from backend/.env")
elif os.path.exists(root_env):
    load_dotenv(root_env)
    print(f"✅ Loaded environment from root .env")
else:
    print("⚠️ No .env file found in backend or root")

openai_api_key = os.getenv("OPENAI_API_KEY")

if not openai_api_key:
    print("❌ Missing OPENAI_API_KEY in your .env file!")
else:
    print("✅ OpenAI API key loaded successfully")

# ------------------------------
# Create AGNO Agent
# ------------------------------
try:
    agno_agent = Agent(
        name="Agno Agent",
        model=OpenAIChat(id="gpt-4o-mini", api_key=openai_api_key),
        db=SqliteDb(db_file="agno.db"),
        tools=[MCPTools(transport="streamable-http", url="https://docs.agno.com/mcp")],
        add_history_to_context=True,
        markdown=True,
    )
    print("✅ AGNO Agent initialized successfully with OpenAI model")

except Exception as e:
    print("❌ Error initializing AGNO Agent:", e)
    agno_agent = None

# ------------------------------
# Create AgentOS (for FastAPI mounting)
# ------------------------------
try:
    agent_os = AgentOS(agents=[agno_agent]) if agno_agent else None
    app = agent_os.get_app() if agent_os else None
    print("✅ AgentOS FastAPI app created successfully")
except Exception as e:
    print("⚠️ Warning: Could not create AgentOS FastAPI app:", e)
    app = None

# ------------------------------
# Helper function for FastAPI integration
# ------------------------------
def get_ai_response(message: str) -> str:
    """
    Returns the AGNO agent's response to the given user message.
    Used in /api/chat/ route in FastAPI.
    """
    if not agno_agent:
        return "⚠️ AGNO Agent is not initialized. Check your API key or setup."

    try:
        print(f"🧠 [AGNO] Processing message: {message}")
        response = agno_agent.run(message)
        print(f"💬 [AGNO] Response: {response}")
        return str(response)
    except Exception as e:
        print("❌ Error from AGNO Agent:", e)
        return f"⚠️ AGNO Agent Error: {str(e)}"
