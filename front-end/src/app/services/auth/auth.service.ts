import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import api from "../main";

@Injectable()
export class AuthService {

  /**
   * Constructor to get infos by store application
   * @param http Http Client to access api services
   */
  constructor() {
  }

  /** Login Docker Registry */
  login(credentials) {
    return api.post(`${environment['apiBasePath']}/api/login/`, {}, {
      auth: credentials
    })
  }

}