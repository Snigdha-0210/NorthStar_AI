from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database.database import Base
from datetime import datetime

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
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="roadmaps")
    items = relationship("RoadmapItem", back_populates="roadmap", cascade="all, delete")

class RoadmapItem(Base):
    __tablename__ = "roadmap_items"

    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    title = Column(String)
    description = Column(String)
    status = Column(String) # not_started, in_progress, completed
    estimated_hours = Column(Integer)

    roadmap = relationship("Roadmap", back_populates="items")
