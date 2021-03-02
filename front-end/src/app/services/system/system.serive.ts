import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
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
  getSystemInfo() {
    return api.get(`${environment['apiBasePath']}/api/system`);
  }

}