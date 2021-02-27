import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    const username = window.localStorage.getItem("repoD_username");

    if (username) {
        return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
