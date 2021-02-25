from .utils.helpers import createTree
from .services import Services
from .models import User

def login(db, username: str, password: str):
    service = Services(db)

    token = service.login(username, password)

    if token:
        users = db.query(User).filter().all()
        if not len(users):
            db.add(User(
                username=username,
                password=password
            ))
            db.commit()

    return bool(token)

def list_repositories(db):
    service = Services(db)
    
    repositories = service.list_repositories()['repositories']
    
    result = { 'root': {} }
    
    folders = []
    for repo in repositories:
        if '/' not in repo:
            result['root'][repo] = {}

        else:
            folders.append(repo.split('/'))

    result = dict(**result, **createTree(folders))
    return result


def list_tags(db, image_name):
    service = Services(db)
    
    return service.list_tags(image_name)


def describe_image(db, image_name, tag):
    service = Services(db)
    
    return service.describe_image(image_name, tag)


def delete_image(db, image_name, tag):
    service = Services(db)
    
    return service.delete_image(image_name, tag)