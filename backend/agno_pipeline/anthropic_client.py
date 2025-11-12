from agno.models.anthropic import AnthropicChat
from backend.config import ANTHROPIC_API_KEY

# Create an Anthropic chat client (Claude model)
anthropic_model = AnthropicChat(
    id="claude-3-sonnet",
    api_key=ANTHROPIC_API_KEY
)
