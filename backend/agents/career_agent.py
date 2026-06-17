import os
import httpx
from pydantic_ai import Agent, RunContext
import os
from pydantic_ai.models.groq import GroqModel
from pydantic import BaseModel, Field
from typing import List

class CareerRecommendation(BaseModel):
    title: str = Field(description="The recommended career title")
    description: str = Field(description="A brief description of why this fits the user")
    match_score: float = Field(description="A percentage match score based on their skills")
    required_skills: List[str] = Field(description="Skills required for this role that the user needs to learn")
    recommended_tutorials: List[str] = Field(description="List of 1-2 search terms the user can use on YouTube to learn these skills", default=[])
    average_salary: str = Field(description="Estimated average salary range for this role (e.g. '$80k - $120k')")
    day_in_the_life: str = Field(description="A 2-3 sentence summary of what a typical day looks like in this role")
    growth_outlook: str = Field(description="The future job market growth outlook for this role (e.g. 'High - 15% growth expected over next decade')")
    top_companies: List[str] = Field(description="3-5 top companies actively hiring for this role")

class CareerPlanResult(BaseModel):
    recommendations: List[CareerRecommendation]
    summary: str = Field(description="An overall summary of the career trajectory")

# Initialize the Groq model for complex reasoning
model = GroqModel('llama-3.3-70b-versatile')

career_agent = Agent(
    model,
    output_type=CareerPlanResult,
    system_prompt=(
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema. "
        "DO NOT wrap your response in <function> tags or any other XML tags. "
        "Just use the native JSON tool call format. "
        "You are an expert Career Mentor AI. Your job is to analyze a user's profile, "
        "skills, and career goals to provide highly personalized career recommendations. "
        "CRITICAL: You MUST generate AT LEAST 10 to 12 highly distinct and personalized career recommendations. "
        "Keep the 'description' and 'day_in_the_life' concise to avoid truncation. Provide thorough and engaging data for 'average_salary', 'top_companies', and 'growth_outlook'. "
        "You must format your response strictly as the requested JSON schema."
    )
)

# (Tool removed to save tokens and avoid Groq rate limit errors)

async def generate_career_plan(user_profile: dict, user_skills: List[dict]) -> CareerPlanResult:
    """
    Invokes the career agent to generate recommendations based on the user's data.
    """
    prompt = f"User Profile: {user_profile}\n\nUser Skills: {user_skills}\n\nPlease generate a career plan and fetch YouTube tutorials for the required skills."
    
    result = await career_agent.run(prompt)
    return result.output
