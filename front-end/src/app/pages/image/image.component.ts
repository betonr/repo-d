import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { closeLoading, showLoading } from 'src/app/app.action';
import { AppState } from 'src/app/app.state';
import { RegistryService } from 'src/app/services/registry/regitry.serive';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {

  imageName: string;

  tags = [];

  enableDelImgs = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rs: RegistryService,
    private _snackBar: MatSnackBar,
    private app: Store<AppState>) {
      this.app.pipe(select('app'as any)).subscribe(res => {
        if (res.system && res.system.enable_remove_images !== undefined) {
          this.enableDelImgs = res.system.enable_remove_images;
        }
      });
    }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        if (params.name) {
          this.imageName = params.name;
          this.getTags(params.name);

        } else {
          this.router.navigate([""]);
        }
      });
    }

    async getTags(imageName) {
      try {
        const response = await this.rs.getTags(imageName);
        this.tags = response.data.tags;
        
      } catch(err) {
        this.router.navigate([""]);
        
      }
    }

    async deleteImage(tag) {
      try {
        this.app.dispatch(showLoading());

        await this.rs.deleteImage(this.imageName, tag);
        
        this.getTags(this.imageName);
        
        this._snackBar.open('Successfully!', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        
      } catch(err) {
        const msg = err && err.response && err.response.data ? err.response.data.detail : 'Error deleting the image';
        this._snackBar.open(msg, '', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      } finally {
        this.app.dispatch(closeLoading());
      }
    }

}