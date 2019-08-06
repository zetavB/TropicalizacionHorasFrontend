import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import {ProfileComponent} from '../profile/profile.component';

const loginRoutes: Routes = [
  { path: 'login',  component: LoginComponent},
  { path: 'perfil', component: ProfileComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
