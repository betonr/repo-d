import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import api from "../main";

@Injectable()
export class RegistryService {

  /**
   * Constructor to get infos by store application
   * @param http Http Client to access api services
   */
  constructor() {
  }

  /** list repositories of Docker Registry */
  getRepositories() {
    return api.get(`${environment['apiBasePath']}/api/list_repositories`);
  }

  /** list image tags of Docker Registry */
  getTags(imageName) {
    return api.get(`${environment['apiBasePath']}/api/image/list_tags`, { params: {
      image_name: imageName
    }});
  }

  /** list images manifest of Docker Registry */
  getImageManifest(imageName, tag) {
    return api.get(`${environment['apiBasePath']}/api/image`, { params: {
      image_name: imageName,
      tag: tag
    }});
  }

  /** delete image of Docker Registry */
  deleteImage(imageName, tag) {
    return api.delete(`${environment['apiBasePath']}/api/image`, { params: {
      image_name: imageName,
      tag: tag
    }});
  }

}