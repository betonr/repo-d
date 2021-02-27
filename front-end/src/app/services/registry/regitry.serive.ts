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
    try {
      const { data } = await api.get(`/api/list_repositories`);
      if (data) {
        return data
      }
    } catch (_) { }
  }

}