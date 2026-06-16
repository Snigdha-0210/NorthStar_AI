from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import User, Profile
from schemas.user import UserCreate, ProfileCreate
from utils.security import get_password_hash

async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalars().first()

async def create_user(db: AsyncSession, user_in: UserCreate) -> User:
    hashed_password = get_password_hash(user_in.password)
    db_user = User(email=user_in.email, hashed_password=hashed_password)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    
    # Create empty profile
    db_profile = Profile(user_id=db_user.id)
    db.add(db_profile)
    await db.commit()
    
    return db_user

async def get_user_profile(db: AsyncSession, user_id: int) -> Profile | None:
    result = await db.execute(select(Profile).where(Profile.user_id == user_id))
    return result.scalars().first()

async def update_user_profile(db: AsyncSession, user_id: int, profile_in: ProfileCreate) -> Profile:
    db_profile = await get_user_profile(db, user_id)
    if db_profile:
        for var, value in vars(profile_in).items():
            if value is not None:
                setattr(db_profile, var, value)
        await db.commit()
        await db.refresh(db_profile)
    return db_profile
