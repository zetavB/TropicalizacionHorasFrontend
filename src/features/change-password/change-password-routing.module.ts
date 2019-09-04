import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChangePasswordComponent} from './change-password/change-password.component';

const changePasswordRoutes: Routes = [
  { path: '',  component: ChangePasswordComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(changePasswordRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChangePasswordRoutingModule { }
