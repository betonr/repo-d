import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import { environment } from 'src/environments/environment';
import { SystemService } from './services/system/system.serive';
import { AppState } from './app.state';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { logout, setInfosApp } from './app.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = ''
  email = ''
  logged = false

  constructor(private router: Router, 
              private spinner: NgxSpinnerService,
              private systemService: SystemService,
              private app: Store<AppState>){
    this.app.pipe(select('app'as any)).subscribe(res => {
      if (res.username && res.username !== this.email) {
        this.logged = true
        this.email = res.username
      } else if(!res.username) {
        this.logged = false
      }

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  ngOnInit() {
    this.getSystemInfo();
  }

  getGravatar() {
    const md5 = new Md5();
    const emailMD5 = md5.appendStr(this.email).end();
    
    return `https://www.gravatar.com/avatar/${emailMD5}?d=404`;
  }

  getVersionApp() {
    return environment['appVersion'];
  }

  async getSystemInfo() {
    try {
      const response = await this.systemService.getSystemInfo();
      this.title = response.data.title;
      
      this.app.dispatch(setInfosApp(response.data));

    } catch(_) {}
  }

  toLogin() {
    this.router.navigate(["login"]);
  }

  logout() {
    this.logged = false;
    this.email = '';
    this.app.dispatch(logout());
    this.router.navigate(["login"]);
  }

  goToHome() {
    this.router.navigate([""]);
  }
}
