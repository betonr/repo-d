from .models import User
from .services import Services
from .utils.helpers import create_tree
from .utils.session import generate_token


def login(username: str, password: str):
    service = Services()

    token = service.login(username, password)

    if bool(token):
        return generate_token(dict(username=username, password=password))

    return False

def list_repositories(user):
    service = Services(user)
    
    repositories = service.list_repositories()['repositories']
    
    result = { 'root': {} }
    
    folders = []
    for repo in repositories:
        if '/' not in repo:
            result['root'][repo] = {}

        else:
            folders.append(repo.split('/'))

    result = dict(**result, **create_tree(folders))
    return result


def list_tags(user, image_name):
    service = Services(user)
    
    return service.list_tags(image_name)


def describe_image(user, image_name, tag):
    service = Services(user)
    
    return service.describe_image(image_name, tag)


def delete_image(user, image_name, tag):
    service = Services(user)
    
    return service.delete_image(image_name, tag)