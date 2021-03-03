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
        this.enableDelImgs = res.system.enable_remove_images
      });
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params.name) {
          this.imageName = params.name;
          this.getTags();

        } else {
          this.router.navigate([""]);
        }
      });
    }

    async getTags() {
      try {
        this.app.dispatch(showLoading());

        const response = await this.rs.getTags(this.imageName);
        this.tags = response.data.tags;
        
      } catch(err) {
        console.log(err)
        this.router.navigate([""]);
        
      } finally {
        this.app.dispatch(closeLoading());
      }
    }

    async deleteImage(tag) {
      try {
        this.app.dispatch(showLoading());

        await this.rs.deleteImage(this.imageName, tag);
        
        this.getTags();
        
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