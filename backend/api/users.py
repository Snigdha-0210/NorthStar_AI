from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.database import get_db
from models.user import User, Profile
from schemas.user import ProfileResponse, ProfileCreate
from utils.firebase_auth import verify_token, FirebaseUser
from sqlalchemy.future import select

router = APIRouter()

async def get_current_user(
    firebase_user: FirebaseUser = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
) -> User:
    result = await db.execute(select(User).where(User.firebase_uid == firebase_user.uid))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found in database. Please sync first.")
    return user

@router.get("/me/profile", response_model=ProfileResponse)
async def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Profile).where(Profile.user_id == current_user.id))
    profile = result.scalars().first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/me/profile", response_model=ProfileResponse)
async def update_my_profile(
    profile_update: ProfileCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Profile).where(Profile.user_id == current_user.id))
    profile = result.scalars().first()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    for var, value in vars(profile_update).items():
        if value is not None:
            setattr(profile, var, value)
            
    await db.commit()
    await db.refresh(profile)
    return profile
