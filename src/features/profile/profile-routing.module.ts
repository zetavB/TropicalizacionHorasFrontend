import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProfileComponent} from './profile.component';
import {LoginComponent} from '../login/login.component';

const profileRoutes: Routes = [
  { path: 'perfil', component: ProfileComponent},
  { path: 'login',  component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }
