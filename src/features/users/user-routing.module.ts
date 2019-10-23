import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersHomeComponent} from './users-home/users-home.component';
import {ReviewerProfileComponent} from './admin-reviewers/components/reviewer-profile/reviewer-profile.component';
import {StudentProfileComponent} from './admin-students/components/student-profile/student-profile.component';

const usersRoutes: Routes = [
  {path: '', component: UsersHomeComponent},
  {path: 'revisor/:correo', component: ReviewerProfileComponent},
  {path: 'estudiante/:correo', component: StudentProfileComponent}
  ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
