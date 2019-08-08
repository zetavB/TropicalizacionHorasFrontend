import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProfileComponent} from './profile.component';

const profileRoutes: Routes = [
  { path: '', component: ProfileComponent},
  { path: 'login',  loadChildren: () => import('../login/login.module')
      .then(mod => mod.LoginModule)}
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
