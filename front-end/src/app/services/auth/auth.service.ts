import { Injectable } from "@angular/core";
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
  async login(credentials) {
    try {
      const { data } = await api.get(`http://localhost:8000/api/login`, {
        auth: credentials
      })
      if (data) {
        return data
      }
    } catch (_) { }
  }

}