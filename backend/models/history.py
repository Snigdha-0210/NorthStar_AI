from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from database.database import Base
from datetime import datetime

class ResumeHistory(Base):
    __tablename__ = "resume_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(String) # Raw text or parsed JSON
    target_role = Column(String)
    score_data = Column(JSON) # Stores ResumeScore schema
    created_at = Column(DateTime, default=datetime.utcnow)

class InterviewHistory(Base):
    __tablename__ = "interview_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(String)
    transcript = Column(String)
    feedback_data = Column(JSON) # Stores InterviewScore schema
    created_at = Column(DateTime, default=datetime.utcnow)

class AgentReport(Base):
    __tablename__ = "agent_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    agent_type = Column(String)
    report_data = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
