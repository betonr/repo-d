import os
from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "RepoD"

    class Config:
        API_SECRET_KEY = os.getenv('API_SECRET_KEY', '')
        API_ENABLE_DELETE_IMG = os.getenv('API_ENABLE_DELETE_IMG', 'false').lower() == 'true'
        
        REGISTRY_URL = os.getenv('REGISTRY_URL', 'http://localhost:5000/v2')
        OAUTH_URL = os.getenv('OAUTH_URL', 'http://localhost:5001/token')

        FRONT_FOLDER_DIST = os.getenv('FRONT_FOLDER_DIST', '/repoD/front-end/')
        FRONT_APP_NAME = os.getenv('FRONT_APP_NAME', 'Docker Registry UI')


settings = Settings()
config = settings.Config