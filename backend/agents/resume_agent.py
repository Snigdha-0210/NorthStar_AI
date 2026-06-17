import os
import io
import pdfplumber
from pydantic_ai import Agent
from pydantic_ai.models.groq import GroqModel
from pydantic import BaseModel, Field
from typing import List

class ResumeFeedback(BaseModel):
    ats_score: int = Field(description="The ATS compatibility score from 0 to 100")
    strengths: List[str] = Field(description="Key strengths found in the resume")
    weaknesses: List[str] = Field(description="Areas where the resume is lacking")
    actionable_tips: List[str] = Field(description="Specific tips to improve the resume for the target role")
    keyword_matches: List[str] = Field(description="Keywords that matched the target role")
    missing_keywords: List[str] = Field(description="Keywords missing from the resume that are crucial for the role")

# Initialize the Groq model for fast parsing and scoring
model = GroqModel("llama-3.3-70b-versatile")

resume_agent = Agent(
    model,
    output_type=ResumeFeedback,
    system_prompt=(
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema. "
        "DO NOT wrap your response in <function> tags or any other XML tags. "
        "Just use the native JSON tool call format. "
        "You are an expert ATS Resume Analyzer and Career Coach. "
        "Analyze the provided resume text against the target job role. "
        "Provide a strict ATS score, identify missing keywords, and give actionable feedback. "
        "Output strictly in the requested JSON format."
    )
)

def parse_pdf_resume(file_bytes: bytes) -> str:
    """Parses a PDF file bytes into plain text using pdfplumber."""
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    return text

async def analyze_resume(resume_text: str, target_role: str) -> ResumeFeedback:
    """
    Invokes the resume agent to score and provide feedback.
    """
    prompt = f"Target Role: {target_role}\n\nResume Content:\n{resume_text}\n\nPlease analyze this resume."
    result = await resume_agent.run(prompt)
    return result.output
