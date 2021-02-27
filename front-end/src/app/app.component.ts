import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import { environment } from 'src/environments/environment';
import { SystemService } from './services/system/system.serive';
import { AppState } from './app.state';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = ''
  email = ''
  logged = false

  constructor(private router: Router, 
              private systemService: SystemService,
              private app: Store<AppState>){
    this.getSystemInfo();

    this.app.pipe(select('app'as any)).subscribe(res => {
      if (res.username) {
        this.logged = true
        this.email = res.username
      } else {
        this.logged = false
      }
    })
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
      this.title = response.title;

    } catch(_) {}
  }

  toLogin() {
    this.router.navigate(["login"]);
  }
}
