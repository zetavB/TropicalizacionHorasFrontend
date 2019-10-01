import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersHomeComponent } from './users-home/users-home.component';
import {UserRoutingModule} from './user-routing.module';
import {AdminReviewersModule} from './admin-reviewers/admin-reviewers.module';
import {AdminStudentsModule} from './admin-students/admin-students.module';
import {CustomMaterialModule} from '../../app/material.module';



@NgModule({
  declarations: [UsersHomeComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AdminReviewersModule,
    AdminStudentsModule,
    CustomMaterialModule
  ]
})
export class UsersModule { }
