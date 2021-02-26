import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import { environment } from 'src/environments/environment';
import { SystemService } from './services/system/system.serive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = ''

  constructor(private systemService: SystemService,){
    this.getSystemInfo();
  }

  getGravatar() {
    const email = 'beto_noronha@live.com';

    const md5 = new Md5();
    const emailMD5 = md5.appendStr(email).end();
    
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
}
