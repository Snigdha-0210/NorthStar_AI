from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text
from sqlalchemy.orm import relationship
from database.database import Base
from datetime import datetime



class CareerMatch(Base):
    __tablename__ = "career_matches"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_domain = Column(String, index=True)
    match_score = Column(Float)
    growth_potential = Column(Float)
    suitability_analysis = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="career_matches")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, index=True)
    level = Column(Integer) # 0 to 100
    category = Column(String) # technical, soft, domain

    user = relationship("User", back_populates="skills")

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    status = Column(String) # active, completed
    target_career = Column(String) # NEW
    learning_velocity_modifier = Column(Float, default=1.0) # NEW
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="roadmaps")
    stages = relationship("RoadmapStage", back_populates="roadmap", cascade="all, delete")

class RoadmapStage(Base):
    __tablename__ = "roadmap_stages"

    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    name = Column(String) # e.g. Beginner, Intermediate, Advanced
    expected_duration_days = Column(Integer, default=30)
    
    roadmap = relationship("Roadmap", back_populates="stages")
    milestones = relationship("Milestone", back_populates="stage", cascade="all, delete")

class Milestone(Base):
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, index=True)
    stage_id = Column(Integer, ForeignKey("roadmap_stages.id"))
    title = Column(String)
    description = Column(String)
    status = Column(String) # not_started, in_progress, completed
    estimated_hours = Column(Integer)
    is_completed = Column(Integer, default=0) # boolean via integer 0/1 for sqlite compat
    recommended_resources = Column(String) # NEW: JSON string
    verification_criteria = Column(Text) # NEW

    stage = relationship("RoadmapStage", back_populates="milestones")
