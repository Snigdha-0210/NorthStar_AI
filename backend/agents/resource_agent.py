from pydantic_ai import Agent, RunContext
import os
from pydantic_ai.models.gemini import GeminiModel
from pydantic import BaseModel, Field
from typing import List
import httpx
import os

class ResourceRecommendation(BaseModel):
    title: str = Field(description="Title of the resource")
    url: str = Field(description="URL to the resource")
    resource_type: str = Field(description="Type: Video, Course, Article, GitHub, etc.")
    why_recommended: str = Field(description="Why this resource is recommended for this milestone")

class MilestoneResources(BaseModel):
    resources: List[ResourceRecommendation] = Field(description="List of recommended resources")

import os
from pydantic_ai.models.groq import GroqModel

# Initialize the model using Groq API (via OpenAI compat layer) to avoid quota issues


model = GroqModel('llama-3.3-70b-versatile')

resource_agent = Agent(
    model,
    output_type=MilestoneResources,
    system_prompt=(
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema. "
        "DO NOT wrap your response in <function> tags or any other XML tags. "
        "Just use the native JSON tool call format. "
        "You are an expert Learning Resource Agent for MentorAI. Your job is to recommend the best "
        "videos, courses, and documentation for a specific learning milestone."
    )
)

# Tool removed to avoid Groq rate limits and schema errors

async def get_resources_for_milestone(milestone_topic: str) -> MilestoneResources:
    prompt = f"Find resources for learning: {milestone_topic}"
    result = await resource_agent.run(prompt)
    return result.output
