import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {NewPasswordComponent} from './new-password/new-password.component';

const forgotPasswordRoutes: Routes = [
  { path: '',  component: ForgotPasswordComponent},
  {path: 'cambiar-contrasenna', component: NewPasswordComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(forgotPasswordRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ForgotPasswordRoutingModule { }
