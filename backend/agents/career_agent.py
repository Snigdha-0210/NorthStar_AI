import os
import httpx
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.gemini import GeminiModel
from pydantic import BaseModel, Field
from typing import List

class CareerRecommendation(BaseModel):
    title: str = Field(description="The recommended career title")
    description: str = Field(description="A brief description of why this fits the user")
    match_score: float = Field(description="A percentage match score based on their skills")
    required_skills: List[str] = Field(description="Skills required for this role that the user needs to learn")
    recommended_tutorials: List[str] = Field(description="YouTube tutorial links fetched via tool", default=[])

class CareerPlanResult(BaseModel):
    recommendations: List[CareerRecommendation]
    summary: str = Field(description="An overall summary of the career trajectory")

# Initialize the Gemini model for complex reasoning
model = GeminiModel("gemini-2.5-pro")

career_agent = Agent(
    model,
    output_type=CareerPlanResult,
    system_prompt=(
        "You are an expert Career Mentor AI. Your job is to analyze a user's profile, "
        "skills, and career goals to provide highly personalized career recommendations. "
        "You have access to a tool to search YouTube for tutorials to help them learn required skills. "
        "You must format your response strictly as the requested JSON schema."
    )
)

@career_agent.tool
async def search_youtube_tutorials(ctx: RunContext[None], query: str) -> List[dict]:
    """Search YouTube for the top 3 video tutorials matching a skill query."""
    api_key = os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        return []
        
    async with httpx.AsyncClient() as client:
        try:
            res = await client.get(
                "https://www.googleapis.com/youtube/v3/search",
                params={
                    "part": "snippet",
                    "q": query + " tutorial course",
                    "type": "video",
                    "maxResults": 3,
                    "key": api_key
                }
            )
            data = res.json()
            videos = []
            for item in data.get("items", []):
                videos.append({
                    "title": item["snippet"]["title"],
                    "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}"
                })
            return videos
        except Exception:
            return []

async def generate_career_plan(user_profile: dict, user_skills: List[dict]) -> CareerPlanResult:
    """
    Invokes the career agent to generate recommendations based on the user's data.
    """
    prompt = f"User Profile: {user_profile}\n\nUser Skills: {user_skills}\n\nPlease generate a career plan and fetch YouTube tutorials for the required skills."
    
    result = await career_agent.run(prompt)
    return result.data
