import os
import httpx
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import Response
from pydantic_ai import Agent
from pydantic_ai.models.groq import GroqModel

router = APIRouter(prefix="/interview", tags=["interview"])

# Initialize Groq Model for ultra low latency interviewing
model = GroqModel("llama-3.3-70b-versatile")
interviewer_agent = Agent(
    model,
    system_prompt=(
        "You are an expert technical interviewer for software engineering roles. "
        "Keep your responses very concise, engaging, and conversational (1-3 sentences max). "
        "Act exactly like a human interviewer. Ask follow up questions based on the candidate's answer."
    )
)

async def transcribe_audio_deepgram(audio_bytes: bytes) -> str:
    api_key = os.getenv("DEEPGRAM_API_KEY")
    if not api_key:
        raise ValueError("Deepgram API Key missing")
        
    url = "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true"
    headers = {
        "Authorization": f"Token {api_key}",
        "Content-Type": "audio/webm" # Assumes webm audio from browser
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, content=audio_bytes, timeout=10.0)
        if response.status_code == 200:
            data = response.json()
            return data["results"]["channels"][0]["alternatives"][0]["transcript"]
        else:
            raise ValueError(f"Deepgram STT failed: {response.text}")

async def generate_speech_elevenlabs(text: str) -> bytes:
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise ValueError("ElevenLabs API Key missing")
        
    voice_id = "21m00Tcm4TlvDq8ikWAM" # Rachel
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json"
    }
    payload = {
        "text": text,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.5}
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload, timeout=15.0)
        if response.status_code == 200:
            return response.content
        else:
            raise ValueError(f"ElevenLabs TTS failed: {response.text}")

@router.post("/voice")
async def process_voice_turn(file: UploadFile = File(...)):
    """
    Receives user audio, transcribes with Deepgram, 
    gets LLM response via Groq, and generates TTS via ElevenLabs.
    """
    try:
        audio_bytes = await file.read()
        
        # 1. STT (Deepgram)
        user_text = await transcribe_audio_deepgram(audio_bytes)
        
        if not user_text.strip():
            raise HTTPException(status_code=400, detail="Could not hear any speech.")

        # 2. LLM (Groq via pydantic-ai)
        result = await interviewer_agent.run(f"Candidate says: {user_text}")
        interviewer_text = result.data
        
        # 3. TTS (ElevenLabs)
        audio_response_bytes = await generate_speech_elevenlabs(interviewer_text)
        
        # Safe encode for headers
        safe_transcript = interviewer_text.replace("\n", " ")
        safe_user_text = user_text.replace("\n", " ")

        return Response(
            content=audio_response_bytes, 
            media_type="audio/mpeg", 
            headers={
                "X-AI-Transcript": safe_transcript.encode('ascii', 'ignore').decode('ascii'), 
                "X-User-Transcript": safe_user_text.encode('ascii', 'ignore').decode('ascii')
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
