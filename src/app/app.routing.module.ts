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