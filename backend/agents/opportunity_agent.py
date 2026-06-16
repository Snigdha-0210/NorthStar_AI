import os
import httpx
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.groq import GroqModel
from pydantic import BaseModel, Field
from typing import List

class Opportunity(BaseModel):
    title: str
    description: str
    url: str
    match_reason: str = Field(description="Why this opportunity is a good fit for the user")

class OpportunityList(BaseModel):
    opportunities: List[Opportunity]

# Initialize Groq Model
model = GroqModel("llama-3.3-70b-versatile")

opportunity_agent = Agent(
    model,
    output_type=OpportunityList,
    system_prompt=(
        "You are an AI Opportunity Matcher. Based on the user's GitHub activity and skills, "
        "recommend real-world opportunities such as open-source projects, hackathons, or internships. "
        "You have a tool to search for real GitHub 'good first issues' based on the user's skills. "
        "Output strictly as a JSON list."
    )
)

@opportunity_agent.tool
async def search_github_issues(ctx: RunContext[None], language: str) -> List[dict]:
    """Search GitHub for real 'good first issues' in a specific programming language."""
    token = os.getenv("GITHUB_TOKEN")
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    } if token else {"Accept": "application/vnd.github.v3+json"}
    
    async with httpx.AsyncClient() as client:
        try:
            res = await client.get(
                "https://api.github.com/search/issues",
                params={"q": f"state:open label:\"good first issue\" language:{language}", "per_page": 3},
                headers=headers
            )
            data = res.json()
            return [{"title": i["title"], "url": i["html_url"], "repo": i["repository_url"]} for i in data.get("items", [])]
        except Exception:
            return []

async def fetch_github_repos(github_username: str) -> List[dict]:
    token = os.getenv("GITHUB_TOKEN")
    headers = {"Authorization": f"token {token}"} if token else {}
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"https://api.github.com/users/{github_username}/repos?sort=updated",
                headers=headers
            )
            if response.status_code == 200:
                return response.json()
        except:
            pass
        return []

async def match_opportunities(user_skills: List[str], github_username: str = None) -> OpportunityList:
    github_data = []
    if github_username:
        github_data = await fetch_github_repos(github_username)
        # Simplify data to pass to LLM to save tokens
        github_data = [{"name": r["name"], "language": r["language"], "description": r["description"]} for r in github_data[:5]]

    prompt = f"User Skills: {user_skills}\n\nRecent GitHub Projects: {github_data}\n\nFind matched opportunities. Use the search_github_issues tool for their top language."
    result = await opportunity_agent.run(prompt)
    return result.data
