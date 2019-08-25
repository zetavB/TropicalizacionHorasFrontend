import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

const loginRoutes: Routes = [
  { path: '',  children: [
    { path: '', component: ActivitiesComponent },
    { path: 'registrar-actividad',  component: ActivityRegisterComponent},
    { path: ':id', component: ActivityDetailsComponent }
  ]}
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
