from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database.database import get_db
from models.user import User, Profile
from models.career import Skill
from api.users import get_current_user
from agents.career_agent import generate_career_plan, CareerPlanResult
from sqlalchemy.future import select

router = APIRouter()

@router.post("/discover", response_model=CareerPlanResult)
async def discover_careers(
    db: AsyncSession = Depends(get_db)
):
    # Dummy profile for MVP testing so user sees real data immediately
    profile_data = {
        "first_name": "Alex",
        "current_title": "Computer Science Student",
        "bio": "Passionate about AI, web development, and cloud computing."
    }
    
    skills_data = [
        {"name": "Python", "level": 80},
        {"name": "JavaScript", "level": 70},
        {"name": "React", "level": 60},
        {"name": "Machine Learning", "level": 50}
    ]

    try:
        # Call the PydanticAI Agent with Gemini
        plan = await generate_career_plan(profile_data, skills_data)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
