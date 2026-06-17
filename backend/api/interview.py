import os
import json
import httpx
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Body
from fastapi.responses import Response
from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel
from pydantic import BaseModel, Field

router = APIRouter(prefix="/interview", tags=["interview"])

class InterviewScore(BaseModel):
    overallScore: int = Field(description="Overall performance score from 0 to 100")
    communicationScore: int = Field(description="Score for clarity and communication from 0 to 100")
    technicalScore: int = Field(description="Score for technical accuracy from 0 to 100")
    confidenceScore: int = Field(description="Score for confidence from 0 to 100")
    feedback: str = Field(description="A detailed paragraph evaluating the candidate, pointing out specific mistakes they made and how to improve.")

model = GeminiModel("gemini-2.5-flash")

interviewer_agent = Agent(
    model,
    system_prompt=(
        "You are an expert, professional technical recruiter conducting a structured mock interview for a software engineering role. "
        "Your goal is to lead the candidate through a realistic interview. "
        "Rules: "
        "1. Ask EXACTLY ONE question at a time. Never ask multiple questions at once. "
        "2. Keep your responses concise (2-4 sentences max). "
        "3. Evaluate the candidate's previous answer briefly, provide encouraging but constructive feedback, and then smoothly transition into asking the next question. "
        "4. Interview Structure: 1) Introduction/Background, 2) Core Technical Concept, 3) Behavioral/Past Experience, 4) Problem Solving scenario, 5) Conclusion. "
        "5. If there is no conversation history, you must initiate the interview by introducing yourself and asking the first question."
    )
)

evaluator_agent = Agent(
    model,
    output_type=InterviewScore,
    system_prompt=(
        "You are an expert technical hiring manager. Your task is to evaluate an interview transcript between an AI Recruiter and a Candidate. "
        "You must analyze the candidate's responses carefully. Identify their mistakes, lack of depth, or technical inaccuracies. "
        "Score them fairly from 0 to 100 on multiple criteria. "
        "Provide a comprehensive feedback paragraph detailing exactly what they did wrong and what they could do better. "
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema."
    )
)


async def transcribe_audio_deepgram(audio_bytes: bytes) -> str:
    api_key = os.getenv("DEEPGRAM_API_KEY")
    if not api_key:
        raise ValueError("Deepgram API Key missing")
        
    url = "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true"
    headers = {
        "Authorization": f"Token {api_key}",
        "Content-Type": "audio/webm"
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, content=audio_bytes, timeout=10.0)
        if response.status_code == 200:
            data = response.json()
            try:
                return data["results"]["channels"][0]["alternatives"][0].get("transcript", "")
            except (KeyError, IndexError):
                return ""
        else:
            raise ValueError(f"Deepgram STT failed: {response.text}")

async def generate_speech_elevenlabs(text: str) -> bytes:
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise ValueError("ElevenLabs API Key missing")
        
    voice_id = "EXAVITQu4vr4xnSDxMaL" # Bella
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json"
    }
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.5}
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload, timeout=15.0)
        if response.status_code == 200:
            return response.content
        else:
            raise ValueError(f"ElevenLabs TTS failed: {response.text}")

@router.post("/voice")
async def process_voice_turn(
    file: Optional[UploadFile] = File(None),
    history: Optional[str] = Form(None)
):
    """
    Stateful interview endpoint.
    If 'file' is None, the AI initiates the conversation.
    If 'history' is provided, it is injected into the LLM context.
    """
    try:
        user_text = ""
        
        # 1. Process STT if a file was provided
        if file is not None:
            audio_bytes = await file.read()
            user_text = await transcribe_audio_deepgram(audio_bytes)
            if not user_text.strip():
                raise HTTPException(status_code=400, detail="Could not hear any speech.")

        # 2. Prepare Context
        prompt = ""
        if history:
            try:
                parsed_history = json.loads(history)
                formatted_history = "\n".join([f"{msg['role'].capitalize()}: {msg['text']}" for msg in parsed_history])
                prompt += f"Here is the conversation history so far:\n{formatted_history}\n\n"
            except Exception:
                pass
        
        if user_text:
            prompt += f"The candidate just said: \"{user_text}\"\n\nEvaluate their answer and ask the next question."
        else:
            prompt += "The interview is just starting. Introduce yourself as the AI recruiter and ask the first question (e.g. asking them to introduce themselves)."

        # 3. LLM (Gemini via pydantic-ai)
        result = await interviewer_agent.run(prompt)
        interviewer_text = result.output
        
        # 4. TTS (ElevenLabs)
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
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/evaluate")
async def evaluate_interview(history: List[Dict[str, str]] = Body(...)):
    """
    Evaluates the full interview transcript and returns a structured score.
    """
    try:
        formatted_history = "\n".join([f"{msg.get('role', 'unknown').capitalize()}: {msg.get('text', '')}" for msg in history])
        prompt = f"Please evaluate this interview transcript:\n\n{formatted_history}"
        
        result = await evaluator_agent.run(prompt)
        return result.data
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
