from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Dict, Any

from database.database import get_db
from models.user import User
from models.career import Skill, CareerMatch
from models.career_dna import CareerDNA
from schemas.career import CareerDNAResponse, CareerMatchResponse
from agents.discovery_agent import generate_career_dna, CareerDNAResult
from agents.matching_agent import generate_career_matches, CareerMatchingResult
from agents.career_agent import generate_career_plan, CareerPlanResult

router = APIRouter()

@router.post("/discover", response_model=CareerPlanResult)
async def discover_careers(
    db: AsyncSession = Depends(get_db)
):
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
        plan = await generate_career_plan(profile_data, skills_data)
        return plan
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/assessment/submit")
async def submit_assessment(
    assessment_data: Dict[str, Any] = Body(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        dna_result = await generate_career_dna(assessment_data)
        user_id = 1 # mock user_id for now
        
        result = await db.execute(select(CareerDNA).where(CareerDNA.user_id == user_id))
        existing_dna = result.scalars().first()
        
        if existing_dna:
            existing_dna.academic_background = dna_result.academic_background
            existing_dna.technical_skills = dna_result.technical_skills
            existing_dna.soft_skills = dna_result.soft_skills
            existing_dna.interests = dna_result.interests
            existing_dna.learning_style = dna_result.learning_style
            existing_dna.work_preferences = dna_result.work_preferences
            existing_dna.risk_tolerance = dna_result.risk_tolerance
            existing_dna.leadership_tendencies = dna_result.leadership_tendencies
            existing_dna.motivation_profile = dna_result.motivation_profile
        else:
            new_dna = CareerDNA(
                user_id=user_id,
                academic_background=dna_result.academic_background,
                technical_skills=dna_result.technical_skills,
                soft_skills=dna_result.soft_skills,
                interests=dna_result.interests,
                learning_style=dna_result.learning_style,
                work_preferences=dna_result.work_preferences,
                risk_tolerance=dna_result.risk_tolerance,
                leadership_tendencies=dna_result.leadership_tendencies,
                motivation_profile=dna_result.motivation_profile
            )
            db.add(new_dna)
            
        await db.commit()
        return dna_result
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dna/{user_id}")
async def get_career_dna(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CareerDNA).where(CareerDNA.user_id == user_id))
    dna = result.scalars().first()
    if not dna:
        raise HTTPException(status_code=404, detail="Career DNA not found")
    return dna

@router.post("/matches/generate")
async def generate_matches(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CareerDNA).where(CareerDNA.user_id == user_id))
    dna = result.scalars().first()
    if not dna:
        raise HTTPException(status_code=404, detail="Career DNA not found")
        
    dna_dict = {
        "academic_background": dna.academic_background,
        "technical_skills": dna.technical_skills,
        "soft_skills": dna.soft_skills,
        "interests": dna.interests,
        "learning_style": dna.learning_style,
        "work_preferences": dna.work_preferences
    }
    
    matches_result = await generate_career_matches(dna_dict)
    
    for match in matches_result.matches:
        new_match = CareerMatch(
            user_id=user_id,
            career_domain=match.career_domain,
            match_score=match.match_score,
            growth_potential=match.growth_potential,
            suitability_analysis=match.suitability_analysis
        )
        db.add(new_match)
    await db.commit()
    return matches_result

@router.get("/matches/{user_id}")
async def get_matches(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CareerMatch).where(CareerMatch.user_id == user_id).order_by(CareerMatch.match_score.desc()))
    matches = result.scalars().all()
    return matches
