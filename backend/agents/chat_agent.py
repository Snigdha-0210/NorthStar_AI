from pydantic_ai import Agent
import os
from pydantic_ai.models.groq import GroqModel
from pydantic import BaseModel, Field

# Initialize the Groq model
model = GroqModel('llama-3.3-70b-versatile')

# A generic chat agent whose system prompt will be modified per-request
chat_agent = Agent(
    model,
    system_prompt=(
        "You are a helpful, specialized AI assistant. "
        "Maintain your persona throughout the conversation."
    )
)

async def generate_chat_reply(agent_id: str, message: str, history: list) -> str:
    """Generates a reply using the chat agent and history."""
    # Define personas based on agent ID
    personas = {
        "a1": "You are a Career Strategist AI. Help the user map out long-term career goals, analyze the job market, and provide strategic career advice.",
        "a2": "You are a Mock Interviewer AI. Conduct realistic technical and behavioral interviews. Ask tough questions, provide constructive feedback, and stay in character as a hiring manager.",
        "a3": "You are a Resume Analyst AI. Help the user optimize their resume against job descriptions, suggest keywords, and format improvements."
    }
    
    # Select persona or fallback to generic
    persona = personas.get(agent_id, "You are a helpful Career Mentor AI.")
    
    # Format the prompt with history
    formatted_history = ""
    for msg in history[-5:]: # Keep last 5 messages for context
        formatted_history += f"\n{msg['role'].capitalize()}: {msg['content']}"
        
    prompt = f"System Instruction: {persona}\n\nRecent Conversation History:{formatted_history}\n\nUser: {message}\n\nPlease provide your next response in character."
    
    result = await chat_agent.run(prompt)
    return result.output
