import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardService } from './app.guard.sevice';
import { LoginComponent } from './pages/login/login.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';

const routes: Routes = [
  { path: '',  canActivate: [AppGuardService], component: RepositoriesComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
