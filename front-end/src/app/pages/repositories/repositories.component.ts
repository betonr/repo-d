import { Component, OnInit } from '@angular/core';
import { RegistryService } from 'src/app/services/registry/regitry.serive';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.sass']
})
export class RepositoriesComponent implements OnInit {

  constructor(private rs: RegistryService){
  }

  ngOnInit() {
    this.getRepositories();
  }

  async getRepositories() {
    try {
      const response = await this.rs.getRepositories();
      console.log(response)
      
    } catch(err) {
      console.log(err)
    }
  }

}
