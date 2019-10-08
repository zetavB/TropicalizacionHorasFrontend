import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UsersHomeComponent} from './users-home/users-home.component';
import {AddReviewerComponent} from './admin-reviewers/components/add-reviewer/add-reviewer.component';
import {ReviewerProfileComponent} from './admin-reviewers/components/reviewer-profile/reviewer-profile.component';
import {StudentProfileComponent} from './admin-students/components/student-profile/student-profile.component';
import {AddStudentComponent} from './admin-students/components/add-student/add-student.component';

const usersRoutes: Routes = [
  {path: '', component: UsersHomeComponent},
  {path: 'agregar-revisor', component: AddReviewerComponent},
  {path: 'revisor/:correo', component: ReviewerProfileComponent},
  {path: 'agregar-estudiante', component: AddStudentComponent},
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
