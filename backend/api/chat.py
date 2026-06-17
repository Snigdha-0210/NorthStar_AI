from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from agents.chat_agent import generate_chat_reply

router = APIRouter()

class ChatRequest(BaseModel):
    agent_id: str
    message: str
    history: List[Dict[str, str]] = []

class ChatResponse(BaseModel):
    reply: str

@router.post("/message", response_model=ChatResponse)
async def chat_message(request: ChatRequest):
    try:
        reply = await generate_chat_reply(request.agent_id, request.message, request.history)
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
