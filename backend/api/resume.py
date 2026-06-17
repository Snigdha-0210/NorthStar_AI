import os
import io
from typing import List, Optional
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel, Field
from pydantic_ai import Agent
from pydantic_ai.models.groq import GroqModel
from pypdf import PdfReader

router = APIRouter()

class ResumeScore(BaseModel):
    overallScore: int = Field(description="Overall ATS match score out of 100")
    impactScore: int = Field(description="Score out of 100 on the impact and quantifiability of bullet points")
    brevityScore: int = Field(description="Score out of 100 on clarity and conciseness")
    styleScore: int = Field(description="Score out of 100 on formatting and action verbs")
    skillsMatchScore: int = Field(description="Score out of 100 based on keyword match with the job description")
    suggestions: List[str] = Field(description="List of actionable suggestions to fix gaps, missing keywords, or weak bullets")

model = GroqModel("llama-3.3-70b-versatile")

resume_agent = Agent(
    model,
    output_type=ResumeScore,
    system_prompt=(
        "You are an expert ATS (Applicant Tracking System) analyzer and Senior Technical Recruiter. "
        "Your task is to analyze a candidate's resume against their target role and the provided job description (if available). "
        "Find gaps in the resume where the candidate is missing critical skills required by the role/JD. "
        "Identify weak bullet points that lack metrics or impact. "
        "Generate a strict JSON response containing numerical scores and an array of specific, actionable suggestions. "
        "Each suggestion should tell the candidate exactly how to rectify the gap or improve their wording."
    )
)

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    target_role: str = Form(...),
    job_description: Optional[str] = Form("")
):
    try:
        # 1. Read PDF file
        file_bytes = await file.read()
        pdf_reader = PdfReader(io.BytesIO(file_bytes))
        resume_text = ""
        for page in pdf_reader.pages:
            resume_text += page.extract_text() + "\n"

        if not resume_text.strip():
            raise ValueError("Could not extract any text from the provided PDF.")

        # 2. Build prompt
        prompt = f"""
Target Role: {target_role}
Job Description: {job_description}

--- RESUME CONTENT ---
{resume_text}
"""
        # 3. Analyze
        result = await resume_agent.run(prompt)
        return result.output
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        # If it's a model HTTP error (like 429 quota), pass the message forward safely
        error_msg = str(e)
        if "429" in error_msg or "quota" in error_msg.lower():
            raise HTTPException(status_code=429, detail="API Quota Exceeded. Google Gemini's free tier only allows 15 requests per minute. Please wait 1 full minute before trying again!")
            
        raise HTTPException(status_code=500, detail=error_msg)

