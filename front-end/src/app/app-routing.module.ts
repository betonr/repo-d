import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardService } from './app.guard.sevice';
import { ImageComponent } from './pages/image/image.component';
import { LoginComponent } from './pages/login/login.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';

const routes: Routes = [
  { path: '',  canActivate: [AppGuardService], component: RepositoriesComponent },
  { path: 'image',  canActivate: [AppGuardService], component: ImageComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
