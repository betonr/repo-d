import base64
import jwt

from fastapi import Depends, HTTPException
from fastapi.security import APIKeyCookie
from time import time

cookie_sec = APIKeyCookie(name="session")

JWT_SECRET = "asda"
JWT_ALGORITHM = "HS256"

def get_current_user(session: str = Depends(cookie_sec)):
    try:
        decoded_token = jwt.decode(session, JWT_SECRET, algorithms=[JWT_ALGORITHM])

        credentials = base64.b64decode(decoded_token["sub"].encode('utf-8')).decode('utf-8')

        return credentials.split(':') if decoded_token["exp"] >= time() else None

    except Exception:
        raise HTTPException(
            status_code=403, detail="Invalid authentication"
        )


def generate_token(credentials):
    user_credentials = f'{credentials["username"]}:{credentials["password"]}'

    user_credentials_encoded = base64.b64encode(bytes(user_credentials, 'utf-8')).decode('utf-8')

    claims = {
        'exp': int(time()) + 3600,
        'sub': user_credentials_encoded
    }

    token = jwt.encode(claims, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token