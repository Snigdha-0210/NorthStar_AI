from pydantic_ai import Agent
import os
from pydantic_ai.models.gemini import GeminiModel
from pydantic import BaseModel, Field
from typing import List, Dict, Any

class CareerTwinPrediction(BaseModel):
    placement_readiness: float = Field(description="Score between 0 and 1 indicating readiness for placement")
    future_salary_estimate: str = Field(description="Estimated future salary range")
    skill_growth_rate: float = Field(description="Estimated growth rate of skills (0 to 1)")
    career_risk_level: str = Field(description="Low, Medium, or High risk of career stagnation")
    skill_obsolescence_warning: List[str] = Field(description="Skills that might become obsolete")
    probability_of_achieving_goal: float = Field(description="Probability of achieving target goal (0 to 1)")

class MotivationIntervention(BaseModel):
    requires_intervention: bool = Field(description="True if the user needs an intervention")
    intervention_type: str = Field(description="Type of intervention: Warning, Suggestion, Motivation")
    message: str = Field(description="The message to deliver to the user")
    alternative_strategies: List[str] = Field(description="Alternative strategies to suggest")



model = GeminiModel('gemini-flash-latest')

career_twin_agent = Agent(
    model,
    output_type=CareerTwinPrediction,
    system_prompt=(
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema. "
        "DO NOT wrap your response in <function> tags or any other XML tags. "
        "Just use the native JSON tool call format. "
        "You are the Career Twin Agent for MentorAI. Your job is to predict the user's future career trajectory "
        "based on their Career DNA, matched careers, and roadmap execution history. Predict their placement readiness, "
        "salary potential, and risks."
    )
)

motivation_agent = Agent(
    model,
    output_type=MotivationIntervention,
    system_prompt=(
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema. "
        "DO NOT wrap your response in <function> tags or any other XML tags. "
        "Just use the native JSON tool call format. "
        "You are the AI Mentor Motivation Agent for MentorAI. Your job is to monitor a user's roadmap progress. "
        "Detect loss of motivation, skill stagnation, or missed milestones. If necessary, trigger an intervention."
    )
)

async def predict_career_twin(user_data: Dict[str, Any]) -> CareerTwinPrediction:
    prompt = f"User Data: {user_data}\n\nPredict the career twin outcomes."
    result = await career_twin_agent.run(prompt)
    return result.output

async def check_motivation_status(progress_data: Dict[str, Any]) -> MotivationIntervention:
    prompt = f"Progress Data: {progress_data}\n\nAnalyze the user's progress and determine if an intervention is needed."
    result = await motivation_agent.run(prompt)
    return result.output
