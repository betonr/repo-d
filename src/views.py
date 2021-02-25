import json
from datetime import date
from fastapi import Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from . import app, get_db
from .controller import login, list_repositories, list_tags, describe_image, delete_image

security = HTTPBasic()


@app.get("/")
def status():
    return {"message": "API Running"}


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

