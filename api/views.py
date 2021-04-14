import json
from os.path import isfile
from datetime import date

from fastapi import HTTPException, Depends, Response
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import JSONResponse

from sqlalchemy.orm import Session
from mimetypes import guess_type

from . import app
from .config import settings, config
from .controller import login, list_repositories, list_tags, describe_image, delete_image
from .utils.session import get_current_user

security = HTTPBasic()


@app.get("/{filename}")
async def get_site(filename):
    fullpath = config.FRONT_FOLDER_DIST + filename

    if not isfile(fullpath):
        filename = 'index.html'
        fullpath = config.FRONT_FOLDER_DIST + filename

    with open(fullpath) as f:
        content = f.read()

    content_type, _ = guess_type(fullpath)
    return Response(content, media_type=content_type)


@app.get("/")
async def get_site_default_filename():
    return await get_site('index.html')


@app.get("/api/")
def status():
    return {"message": f"{settings.app_name} - API Running"}


@app.get("/api/system")
def system_info():
    return {
        "title": config.FRONT_APP_NAME,
        "registry_url": config.REGISTRY_URL,
        "enable_remove_images": config.API_ENABLE_DELETE_IMG
    }


@app.post("/api/login/")
def login_route(response: Response, c: HTTPBasicCredentials = Depends(security)):
    session_token, username = login(c.username, c.password)

    if not session_token:
        raise HTTPException(
            status_code=403, detail="Invalid user or password"
        )

    response.set_cookie("session", session_token)
    
    return {"detail": "Login Successfully!", "username": username}


@app.post("/api/logout/")
def logout_route(response: Response):
    response.delete_cookie("session")
    
    return {"detail": "Logout Successfully!"}


@app.get("/api/list_repositories")
def list_repositories_route(user: str = Depends(get_current_user)):
    return list_repositories(user)


@app.get("/api/image/list_tags")
def list_tags_route(image_name: str, user: str = Depends(get_current_user)):
    response, status_code = list_tags(user, image_name)
    
    return JSONResponse(response, status_code=status_code)


@app.get("/api/image")
def describe_image_route(image_name: str, tag: str, user: str = Depends(get_current_user)):
    response, status_code = describe_image(user, image_name, tag)
    
    return JSONResponse(response, status_code=status_code)


@app.delete("/api/image")
def delete_image_route(image_name: str, tag: str, user: str = Depends(get_current_user)):
    if not config.API_ENABLE_DELETE_IMG:
        raise HTTPException(
            status_code=401, detail="This application is not allowed to delete images"
        )

    response, status_code = delete_image(user, image_name, tag)
    
    return JSONResponse(response, status_code=status_code)

