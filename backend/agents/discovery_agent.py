from pydantic_ai import Agent
import os
from pydantic_ai.models.gemini import GeminiModel
from pydantic import BaseModel, Field
from typing import List, Dict, Any

class CareerDNAResult(BaseModel):
    academic_background: str = Field(description="Summary of academic background")
    technical_skills: List[str] = Field(description="Extracted technical skills")
    soft_skills: List[str] = Field(description="Extracted soft skills")
    interests: List[str] = Field(description="Core interests and passions")
    learning_style: str = Field(description="User's preferred learning style")
    work_preferences: List[str] = Field(description="Work preferences and environment needs")
    risk_tolerance: str = Field(description="Risk tolerance (e.g., Startup vs Corporate)")
    leadership_tendencies: str = Field(description="Leadership potential and style")
    motivation_profile: Dict[str, Any] = Field(description="Key drivers and motivations")



model = GeminiModel('gemini-flash-latest')

discovery_agent = Agent(
    model,
    output_type=CareerDNAResult,
    system_prompt=(
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema. "
        "DO NOT wrap your response in <function> tags or any other XML tags. "
        "Just use the native JSON tool call format. "
        "You are an expert Career Discovery AI for MentorAI. Your job is to perform a deep assessment "
        "of a user's answers and extract their Career DNA Profile. Analyze their academic background, "
        "current skills, soft skills, interests, and preferences to formulate a structured profile. "
        "Format your output exactly as the requested JSON schema."
    )
)

async def generate_career_dna(assessment_data: Dict[str, Any]) -> CareerDNAResult:
    """Generates the Career DNA based on user assessment answers."""
    prompt = f"User Assessment Data: {assessment_data}\n\nGenerate the comprehensive Career DNA Profile."
    result = await discovery_agent.run(prompt)
    return result.output
