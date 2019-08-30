import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';

const loginRoutes: Routes = [
  { path: '',  children: [
    { path: '', component: ActivitiesComponent },
    { path: 'registrar-actividad',  component: ActivityRegisterComponent},
    { path: ':id', component: ActivityDetailsComponent },
    { path: 'editar/:id', component: ActivityEditComponent }
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
