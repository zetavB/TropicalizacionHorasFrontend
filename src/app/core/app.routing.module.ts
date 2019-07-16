import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { LoginLayoutComponent } from '../layout/login-layout.component';
import { HomeLayoutComponent } from '../layout/home-layout.component';
import { ProfileComponent } from '../components/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'perfil',
        component: ProfileComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
