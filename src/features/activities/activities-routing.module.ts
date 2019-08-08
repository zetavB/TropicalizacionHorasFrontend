import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';

const loginRoutes: Routes = [
  { path: 'actividades',  component: ActivitiesComponent},
  { path: 'registrar-actividad',  component: ActivityRegisterComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivitiesRoutingModule { }
