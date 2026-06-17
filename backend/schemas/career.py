from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class SkillBase(BaseModel):
    name: str
    level: int
    category: str

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class RoadmapItemBase(BaseModel):
    title: str
    description: str
    status: str
    estimated_hours: int
    recommended_resources: Optional[str] = None # JSON string or list depending on implementation
    verification_criteria: Optional[str] = None

class RoadmapItemCreate(RoadmapItemBase):
    pass

class RoadmapItemResponse(RoadmapItemBase):
    id: int
    roadmap_id: int

    class Config:
        from_attributes = True

class RoadmapBase(BaseModel):
    title: str
    description: str
    status: str
    target_career: Optional[str] = None
    learning_velocity_modifier: Optional[float] = 1.0

class RoadmapCreate(RoadmapBase):
    pass

class RoadmapResponse(RoadmapBase):
    id: int
    user_id: int
    created_at: datetime
    items: List[RoadmapItemResponse] = []

    class Config:
        from_attributes = True

class CareerDNABase(BaseModel):
    academic_background: Optional[str] = None
    technical_skills: Optional[List[str]] = None
    soft_skills: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    learning_style: Optional[str] = None
    work_preferences: Optional[List[str]] = None
    risk_tolerance: Optional[str] = None
    leadership_tendencies: Optional[str] = None
    motivation_profile: Optional[Dict[str, Any]] = None

class CareerDNACreate(CareerDNABase):
    pass

class CareerDNAResponse(CareerDNABase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class CareerMatchBase(BaseModel):
    career_domain: str
    match_score: float
    growth_potential: float
    suitability_analysis: Optional[str] = None

class CareerMatchCreate(CareerMatchBase):
    pass

class CareerMatchResponse(CareerMatchBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
