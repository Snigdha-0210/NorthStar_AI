from pydantic_ai import Agent
import os
from pydantic_ai.models.gemini import GeminiModel
from pydantic import BaseModel, Field
from typing import List, Optional

class MilestoneSchema(BaseModel):
    title: str = Field(description="Title of the learning milestone")
    description: str = Field(description="Detailed description of what to learn")
    estimated_hours: int = Field(description="Estimated hours to complete")
    verification_criteria: Optional[str] = Field(description="Criteria to verify milestone completion")

class RoadmapStageSchema(BaseModel):
    name: str = Field(description="Name of the stage (e.g. Beginner, Intermediate, Advanced)")
    expected_duration_days: int = Field(description="Expected days to complete this stage")
    milestones: List[MilestoneSchema] = Field(description="List of milestones for this stage")

class RoadmapResult(BaseModel):
    title: str = Field(description="Overall title of the roadmap (e.g. AI Engineer Roadmap)")
    description: str = Field(description="Brief summary of the learning path")
    stages: List[RoadmapStageSchema] = Field(description="The chronological stages of the roadmap")

import os
from pydantic_ai.models.groq import GroqModel

# Initialize the model using Groq API (via OpenAI compat layer) to avoid quota issues


model = GroqModel('llama-3.3-70b-versatile')

roadmap_agent = Agent(
    model,
    output_type=RoadmapResult,
    system_prompt=(
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema. "
        "DO NOT wrap your response in <function> tags or any other XML tags. "
        "Just use the native JSON tool call format. "
        "You are an expert Career Roadmap Generator AI. Your job is to create a highly detailed, "
        "personalized learning roadmap based on the user's chosen career path, current skills, and learning velocity. "
        "The roadmap MUST include distinct stages (Beginner, Intermediate, Advanced) and actionable milestones. "
        "Each milestone should have clear verification criteria. Format your output exactly as the requested JSON schema."
    )
)

async def generate_dynamic_roadmap(career_path: str, current_skills: list, learning_velocity_modifier: float = 1.0) -> RoadmapResult:
    """Generates a dynamic roadmap using the pydantic-ai agent."""
    prompt = f"Target Career Path: {career_path}\nCurrent Skills: {current_skills}\nLearning Velocity Modifier: {learning_velocity_modifier}\nGenerate a comprehensive roadmap, adjusting expected times based on velocity."
    result = await roadmap_agent.run(prompt)
    return result.output
