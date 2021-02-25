import requests

from itsdangerous import URLSafeSerializer

from requests.auth import HTTPBasicAuth

from .models import User

class Services:

    def __init__(self, db):
        self._db = db
        

    def login(self, username=None, password=None, scope='registry:catalog:*'):
        url_base = 'https://oauth.dpi.inpe.br/api/oauth/auth/token'
        # url_base = 'http://localhost:5001/oauth/token'

        query = f'?service=registry&scope={scope}'

        if not username and not password:
            users = self._db.query(User).filter().all()
            if not len(users):
                return False
            
            username = users[0].username
            password = users[0].password

        r = requests.get(f'{url_base}{query}', auth=HTTPBasicAuth(username, password))
        if r.status_code >= 400:
            return False

        return r.json()['access_token']


    def list_repositories(self,):
        url = 'https://registry.dpi.inpe.br/v2/_catalog'

        token = self.login()
        if not token:
            return False

        r = requests.get(url, headers={'Authorization': f'Bearer {token}'})
        if r.status_code >= 400:
            return False

        return r.json()

    
    def list_tags(self, image_name):
        url = 'https://registry.dpi.inpe.br/v2/'
        suffix = f'{image_name}/tags/list'

        token = self.login(scope=f'repository:{image_name}:*')
        if not token:
            return False, 403

        r = requests.get(f'{url}/{suffix}', headers={'Authorization': f'Bearer {token}'})
        if r.status_code >= 400:
            return False, 404

        return r.json(), 200


    def describe_image(self, image_name, tag):
        url = 'https://registry.dpi.inpe.br/v2/'
        suffix = f'{image_name}/manifests/{tag}'

        token = self.login(scope=f'repository:{image_name}:*')
        if not token:
            return False, 403

        r = requests.get(f'{url}/{suffix}', headers={'Authorization': f'Bearer {token}'})
        if r.status_code >= 400:
            return False, 404

        return r.json(), 200


    def delete_image(self, image_name, tag):
        url = 'https://registry.dpi.inpe.br/v2/'
        suffix = f'{image_name}/manifests/{tag}'

        token = self.login(scope=f'repository:{image_name}:*')
        if not token:
            return False, 403

        r = requests.delete(f'{url}/{suffix}', headers={'Authorization': f'Bearer {token}'})
        if r.status_code >= 400:
            return False, 404

        return r.json(), 200