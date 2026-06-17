from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any

from agents.intelligence_agents import predict_career_twin, CareerTwinPrediction, check_motivation_status, MotivationIntervention

router = APIRouter()

@router.get("/twin/{user_id}", response_model=CareerTwinPrediction)
async def get_career_twin(user_id: int):
    # Mock user data fetch
    user_data = {"user_id": user_id, "skills": "Python, React", "goal": "Full Stack"}
    prediction = await predict_career_twin(user_data)
    return prediction

@router.get("/interventions/{user_id}", response_model=MotivationIntervention)
async def get_interventions(user_id: int):
    progress_data = {"user_id": user_id, "last_completed": "7 days ago"}
    intervention = await check_motivation_status(progress_data)
    return intervention
