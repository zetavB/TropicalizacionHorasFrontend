import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StoreModule } from '@ngrx/store';
import * as fromStudent from './state/student.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './state/student.effects';



@NgModule({
  declarations: [StudentsListComponent, StudentFormComponent, StudentProfileComponent, AddStudentComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromStudent.studentFeatureKey, fromStudent.reducer),
    EffectsModule.forFeature([StudentEffects])
  ]
})
export class AdminStudentsModule { }
