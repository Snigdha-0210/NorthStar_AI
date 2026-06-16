from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.database import get_db
from models.user import User, Profile
from schemas.user import UserResponse
from utils.firebase_auth import verify_token, FirebaseUser
from sqlalchemy.future import select

router = APIRouter()

@router.post("/sync", response_model=UserResponse)
async def sync_firebase_user(
    firebase_user: FirebaseUser = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
):
    """
    Syncs a Firebase user with the PostgreSQL database.
    If the user doesn't exist in Postgres, it creates them along with an empty profile.
    """
    result = await db.execute(select(User).where(User.firebase_uid == firebase_user.uid))
    db_user = result.scalars().first()

    if not db_user:
        if not firebase_user.email:
            raise HTTPException(status_code=400, detail="Firebase token does not contain an email address.")
        
        # Create new Postgres user
        db_user = User(
            firebase_uid=firebase_user.uid,
            email=firebase_user.email
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        
        # Create empty profile
        db_profile = Profile(user_id=db_user.id)
        db.add(db_profile)
        await db.commit()

    return db_user
