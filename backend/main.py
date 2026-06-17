import logging
import os
from dotenv import load_dotenv

# Load from parent directory
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local')
load_dotenv(dotenv_path)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.config import settings

# Import routers
from api import auth, users, careers, interview, roadmaps, intelligence, resume, chat, settings as app_settings

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Frontend Next.js port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-AI-Transcript", "X-User-Transcript"],
)

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting up {settings.PROJECT_NAME} Backend...")

@app.get("/")
def root():
    return {"message": f"{settings.PROJECT_NAME} API is running."}

# Include API Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["Users"])
app.include_router(careers.router, prefix=f"{settings.API_V1_STR}/careers", tags=["Careers"])
app.include_router(roadmaps.router, prefix=f"{settings.API_V1_STR}/roadmaps", tags=["Roadmaps"])
app.include_router(intelligence.router, prefix=f"{settings.API_V1_STR}/intelligence", tags=["Intelligence"])
app.include_router(interview.router, prefix=f"{settings.API_V1_STR}", tags=["Interview"])
app.include_router(resume.router, prefix=f"{settings.API_V1_STR}/resume", tags=["Resume"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["Chat"])
app.include_router(app_settings.router, prefix=f"{settings.API_V1_STR}/settings", tags=["Settings"])
