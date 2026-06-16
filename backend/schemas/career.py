from pydantic import BaseModel
from typing import Optional, List
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

class RoadmapCreate(RoadmapBase):
    pass

class RoadmapResponse(RoadmapBase):
    id: int
    user_id: int
    created_at: datetime
    items: List[RoadmapItemResponse] = []

    class Config:
        from_attributes = True
