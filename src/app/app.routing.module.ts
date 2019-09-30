import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'actividades',
    loadChildren: () => import('../features/activities/activities.module')
      .then(mod => mod.ActivitiesModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('../features/profile/profile.module')
      .then(mod => mod.ProfileModule)
  },
  {
    path: 'olvido-contrasenna',
    loadChildren: () => import('../features/forgot-password/forgot-password.module')
      .then(mod => mod.ForgotPasswordModule)
  },
  {
    path: 'cambiar-contrasenna',
    loadChildren: () => import('../features/change-password/change-password.module')
      .then(mod => mod.ForgotPasswordModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('../features/projects/projects.module')
      .then(mod => mod.ProjectsModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('../features/categories/categories.module')
      .then(mod => mod.CategoriesModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
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
