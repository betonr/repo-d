import { Injectable } from "@angular/core";
import api from "../main";

@Injectable()
export class SystemService {

  /**
   * Constructor to get infos by store application
   * @param http Http Client to access api services
   */
  constructor() {
  }

  /** Login Docker Registry */
  async getSystemInfo() {
    const { data } = await api.get(`http://localhost:8000/api/system`);
    return data
  }

}