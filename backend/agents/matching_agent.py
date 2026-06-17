from pydantic_ai import Agent
import os
from pydantic_ai.models.gemini import GeminiModel
from pydantic import BaseModel, Field
from typing import List, Dict, Any

class CareerMatchSchema(BaseModel):
    career_domain: str = Field(description="The matching career domain (e.g. AI Engineer)")
    match_score: float = Field(description="Score between 0.0 and 1.0 representing suitability")
    growth_potential: float = Field(description="Score between 0.0 and 1.0 representing market growth")
    suitability_analysis: str = Field(description="Detailed analysis of why this fits the user's DNA")

class CareerMatchingResult(BaseModel):
    matches: List[CareerMatchSchema] = Field(description="List of top matched careers, ranked by match_score")



model = GeminiModel('gemini-flash-latest')

matching_agent = Agent(
    model,
    output_type=CareerMatchingResult,
    system_prompt=(
        "IMPORTANT: Output your final response STRICTLY as a JSON object matching the requested schema. "
        "DO NOT wrap your response in <function> tags or any other XML tags. "
        "Just use the native JSON tool call format. "
        "You are an expert Career Matching Engine for MentorAI. Your job is to compare a user's Career DNA "
        "against a large database of technology and business domains. Identify the top 3 most suitable "
        "career paths for them. Score their match objectively and provide suitability analysis. "
        "Format your output exactly as the requested JSON schema."
    )
)

async def generate_career_matches(career_dna: Dict[str, Any]) -> CareerMatchingResult:
    """Generates career matches based on the user's Career DNA."""
    prompt = f"User Career DNA: {career_dna}\n\nAnalyze the DNA and recommend the top matching career domains."
    result = await matching_agent.run(prompt)
    return result.output
