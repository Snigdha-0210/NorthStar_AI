import os
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

# Initialize Firebase Admin SDK
# You must provide the service account key path or credentials
# For development, you can use the default app if GOOGLE_APPLICATION_CREDENTIALS is set
try:
    firebase_admin.initialize_app()
except ValueError:
    # App already initialized
    pass

security = HTTPBearer()

class FirebaseUser(BaseModel):
    uid: str
    email: str | None = None
    email_verified: bool = False

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> FirebaseUser:
    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return FirebaseUser(
            uid=decoded_token.get('uid'),
            email=decoded_token.get('email'),
            email_verified=decoded_token.get('email_verified', False)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
