from sqlalchemy import Column, Integer, String, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from database.database import Base

class CareerDNA(Base):
    __tablename__ = "career_dna"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, index=True)
    academic_background = Column(String, nullable=True)
    technical_skills = Column(JSON, nullable=True) # Array of strings
    soft_skills = Column(JSON, nullable=True)
    interests = Column(JSON, nullable=True)
    learning_style = Column(String, nullable=True)
    work_preferences = Column(JSON, nullable=True)
    risk_tolerance = Column(String, nullable=True)
    leadership_tendencies = Column(String, nullable=True)
    motivation_profile = Column(JSON, nullable=True)

    user = relationship("User", back_populates="career_dna")
