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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AuthService } from './services/auth/auth.service';
import { SystemService } from './services/system/system.serive';
import { AppGuardService } from './app.guard.sevice';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './app.reducer';
import { LoginComponent } from './pages/login/login.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';
import { RegistryService } from './services/registry/regitry.serive';
import { ImageContainerComponent } from './pages/repositories/image-container/image-container.component';
import { ImageComponent } from './pages/image/image.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    ImageContainerComponent,
    LoginComponent,
    RepositoriesComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    NgxSpinnerModule,
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
