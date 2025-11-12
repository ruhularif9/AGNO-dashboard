from textwrap import dedent
from agno.agent import Agent
from backend.agno_pipeline.anthropic_client import anthropic_model

def create_agent(agent_name: str):
    return Agent(
        model=anthropic_model,
        instructions=dedent(f"""
            You are an advanced AI agent named {agent_name}.
            Help users with intelligent, friendly, and detailed responses.
        """)
    )
