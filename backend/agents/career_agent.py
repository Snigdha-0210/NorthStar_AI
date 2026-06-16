import os
from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel
from pydantic import BaseModel, Field
from typing import List

class CareerRecommendation(BaseModel):
    title: str = Field(description="The recommended career title")
    description: str = Field(description="A brief description of why this fits the user")
    match_score: float = Field(description="A percentage match score based on their skills")
    required_skills: List[str] = Field(description="Skills required for this role that the user needs to learn")

class CareerPlanResult(BaseModel):
    recommendations: List[CareerRecommendation]
    summary: str = Field(description="An overall summary of the career trajectory")

# Initialize the Gemini model for complex reasoning
# We assume GEMINI_API_KEY is available in the environment via config
model = GeminiModel("gemini-2.5-pro")

career_agent = Agent(
    model,
    output_type=CareerPlanResult,
    system_prompt=(
        "You are an expert Career Mentor AI. Your job is to analyze a user's profile, "
        "skills, and career goals to provide highly personalized career recommendations. "
        "You must format your response strictly as the requested JSON schema."
    )
)

async def generate_career_plan(user_profile: dict, user_skills: List[dict]) -> CareerPlanResult:
    """
    Invokes the career agent to generate recommendations based on the user's data.
    """
    prompt = f"User Profile: {user_profile}\n\nUser Skills: {user_skills}\n\nPlease generate a career plan."
    
    # Run the agent synchronously or asynchronously
    result = await career_agent.run(prompt)
    return result.data
