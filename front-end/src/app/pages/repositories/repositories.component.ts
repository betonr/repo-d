import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { closeLoading, showLoading } from 'src/app/app.action';
import { AppState } from 'src/app/app.state';
import { RegistryService } from 'src/app/services/registry/regitry.serive';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.sass']
})
export class RepositoriesComponent implements OnInit {

  fullImages = {}

  listImagesByFolder = {}

  repositories = []

  constructor(
    private rs: RegistryService, 
    private _snackBar: MatSnackBar,
    private app: Store<AppState>){
  }

  ngOnInit() {
    this.getRepositories();
  }

  async getRepositories() {
    try {
      this.app.dispatch(showLoading());

      const response = await this.rs.getRepositories();
      this.fullImages = response.data;
      this.repositories = Object.keys(response.data);
      Object.keys(response.data).forEach(r => {
        this.listImagesByFolder[r] = Object.entries(response.data[r]);
      });
      
    } catch(_) {
      this._snackBar.open('Not found images with your permission', '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    } finally {
      this.app.dispatch(closeLoading());
    }
  }

  isFolder(obj) {
    return Object.values(obj[1]).length
  }

  getFullImages(r, value="") {
    const results = []

    for (let a in r) {
      if (Object.values(r[a]).length) {
        return this.getFullImages(r[a], value+'/'+a)
      } else {
        results.push(value+'/'+a)
      }
    }

    return results
  }

  getNameImage(folder, subName) {
    return `${folder != 'root' ? folder + '/' : ''}${subName}`
  }
  
}
