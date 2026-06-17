from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
import json

from database.database import get_db
from models.user import User
from models.career import Roadmap, RoadmapStage, Milestone
from agents.roadmap_agent import generate_dynamic_roadmap, RoadmapResult
from agents.resource_agent import get_resources_for_milestone, MilestoneResources
from pydantic import BaseModel
from sqlalchemy.orm import selectinload

router = APIRouter()

class GenerateRoadmapRequest(BaseModel):
    career_path: str
    current_skills: List[str]
    user_id: int

@router.post("/generate")
async def generate_roadmap(
    request: GenerateRoadmapRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        # Call the Roadmap Agent
        roadmap_result = await generate_dynamic_roadmap(request.career_path, request.current_skills)
        
        # Archive existing active roadmaps for this user
        existing_active = await db.execute(
            select(Roadmap).where(Roadmap.user_id == request.user_id, Roadmap.status == "active")
        )
        for r in existing_active.scalars().all():
            r.status = "archived"
            
        # Save to database
        new_roadmap = Roadmap(
            user_id=request.user_id,
            title=roadmap_result.title,
            description=roadmap_result.description,
            status="active",
            target_career=request.career_path,
            learning_velocity_modifier=1.0
        )
        db.add(new_roadmap)
        await db.commit()
        await db.refresh(new_roadmap)
        
        for stage in roadmap_result.stages:
            new_stage = RoadmapStage(
                roadmap_id=new_roadmap.id,
                name=stage.name,
                expected_duration_days=stage.expected_duration_days
            )
            db.add(new_stage)
            await db.commit()
            await db.refresh(new_stage)
            
            for milestone in stage.milestones:
                resources = await get_resources_for_milestone(milestone.title)
                
                new_milestone = Milestone(
                    stage_id=new_stage.id,
                    title=milestone.title,
                    description=milestone.description,
                    status="not_started",
                    estimated_hours=milestone.estimated_hours,
                    is_completed=0,
                    verification_criteria=milestone.verification_criteria,
                    recommended_resources=resources.model_dump_json()
                )
                db.add(new_milestone)
        
        await db.commit()
        return roadmap_result
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/active/{user_id}")
async def get_active_roadmap(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Roadmap)
        .options(selectinload(Roadmap.stages).selectinload(RoadmapStage.milestones))
        .where(Roadmap.user_id == user_id, Roadmap.status == "active")
    )
    roadmap = result.scalars().first()
    
    if not roadmap:
        raise HTTPException(status_code=404, detail="No active roadmap found")
        
    return roadmap
