from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os

router = APIRouter()

class ApiKeysUpdate(BaseModel):
    groq_api_key: str | None = None
    gemini_api_key: str | None = None

@router.post("/keys")
async def update_api_keys(keys: ApiKeysUpdate):
    try:
        # Load from parent directory
        dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env.local')
        
        # Read existing lines
        if os.path.exists(dotenv_path):
            with open(dotenv_path, "r") as f:
                lines = f.readlines()
        else:
            lines = []

        # Update or add keys
        env_dict = {}
        for line in lines:
            if "=" in line and not line.startswith("#"):
                key, val = line.strip().split("=", 1)
                env_dict[key] = val

        if keys.groq_api_key is not None:
            env_dict["GROQ_API_KEY"] = keys.groq_api_key
        if keys.gemini_api_key is not None:
            env_dict["GEMINI_API_KEY"] = keys.gemini_api_key

        # Write back to file
        with open(dotenv_path, "w") as f:
            for key, val in env_dict.items():
                f.write(f"{key}={val}\n")
                
        # Also update os.environ immediately so running processes get it
        if keys.groq_api_key is not None:
            os.environ["GROQ_API_KEY"] = keys.groq_api_key
        if keys.gemini_api_key is not None:
            os.environ["GEMINI_API_KEY"] = keys.gemini_api_key

        return {"message": "API keys updated successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
