import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from './services/auth/auth.service';
import { SystemService } from './services/system/system.serive';
import { AppGuardService } from './app.guard.sevice';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './app.reducer';
import { LoginComponent } from './pages/login/login.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';
import { RegistryService } from './services/registry/regitry.serive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RepositoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      app: fromApp.reducer
    })
  ],
  providers: [
    AuthService,
    RegistryService,
    SystemService,
    AppGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
