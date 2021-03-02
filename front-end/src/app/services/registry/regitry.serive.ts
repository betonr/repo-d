import { Injectable } from "@angular/core";
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
  async getRepositories() {
    const { data } = await api.get(`http://localhost:8000/api/list_repositories`);
    return data;
  }

  /** list image tags of Docker Registry */
  async getTags(imageName) {
    const { data } = await api.get(`http://localhost:8000/api/image/list_tags`, { params: {
      image_name: imageName
    }});
    return data;
  }

  /** list images manifest of Docker Registry */
  async getImageManifest(imageName, tag) {
    const { data } = await api.get(`http://localhost:8000/api/image`, { params: {
      image_name: imageName,
      tag: tag
    }});
    return data;
  }

  /** delete image of Docker Registry */
  async deleteImage(imageName, tag) {
    const { data } = await api.delete(`http://localhost:8000/api/image`, { params: {
      image_name: imageName,
      tag: tag
    }});
    return data;
  }

}