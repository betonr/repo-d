import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setUser } from 'src/app/app.action';
import { AppState } from 'src/app/app.state';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor( 
    private formBuilder: FormBuilder, 
    private as: AuthService,
    private _snackBar: MatSnackBar,
    private app: Store<AppState>,
    private router: Router){
      this.app.pipe(select('app' as any)).subscribe(res => {
        if (res.username) {
          this.router.navigate(['']);
        }
      })
  }

  async onSubmit() {
    try {
      if (this.loginForm.status === 'VALID') {
        const data = this.loginForm.value;
  
        const response = await this.as.login(data);

        if (response.data['username']) {

          this._snackBar.open('Welcome!', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });

          this.app.dispatch(setUser({"username": response.data['username']}));

          this.router.navigate([""]);

        } throw Error
    
      } else {
        this._snackBar.open('Complete all fields!', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
  
    } catch(err) {
      this._snackBar.open('Incorrect username or password!', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

}
