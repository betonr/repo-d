import json
from os.path import isfile
from datetime import date
from fastapi import Depends, Response
from mimetypes import guess_type
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from . import app, get_db
from .controller import login, list_repositories, list_tags, describe_image, delete_image

security = HTTPBasic()


@app.get("/{filename}")
async def get_site(filename):
    filename = '/media/beto/DATA7/apps/github/docker-registry-ui/front-end/dist/front-end/' + filename

    if not isfile(filename):
        return Response(status_code=404)

    with open(filename) as f:
        content = f.read()

    content_type, _ = guess_type(filename)
    return Response(content, media_type=content_type)


@app.get("/")
async def get_site_default_filename():
    return await get_site('index.html')


@app.get("/api/")
def status():
    return {"message": "API Running"}


@app.get("/api/system")
def system_info():
    return {
        "title": "Docker Registry UI",
        "registry_url": "http://localhost:5001",
        "enable_remove_images": False
    }


@app.post("/api/login/")
def login_route(c: HTTPBasicCredentials = Depends(security), db: Session = Depends(get_db)):
    return login(db, c.username, c.password)


@app.get("/api/list_repositories")
def list_repositories_route(db: Session = Depends(get_db)):
    return list_repositories(db)


@app.get("/api/image/list_tags")
def list_tags_route(image_name: str, db: Session = Depends(get_db)):
    response, status_code = list_tags(db, image_name)
    
    return JSONResponse(response, status_code=status_code)


@app.get("/api/image")
def describe_image_route(image_name: str, tag: str, db: Session = Depends(get_db)):
    response, status_code = describe_image(db, image_name, tag)
    
    return JSONResponse(response, status_code=status_code)


@app.delete("/api/image")
def delete_image_route(image_name: str, tag: str, db: Session = Depends(get_db)):
    response, status_code = delete_image(db, image_name, tag)
    
    return JSONResponse(response, status_code=status_code)

