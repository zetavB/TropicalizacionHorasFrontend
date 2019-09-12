import * as fromProjects from './state/projects.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects } from './state/projects.effects';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectsHomeComponent } from './components/projects-home/projects-home.component';
import { ProjectStudentsComponent } from './components/project-students/project-students.component';
import { AddStudentsToProjectComponent } from './components/add-students-to-project/add-students-to-project.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../../app/material.module';
import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsService} from './projects.service';



@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectDetailsComponent,
    AddProjectComponent,
    ProjectsHomeComponent,
    ProjectStudentsComponent,
    AddStudentsToProjectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    ProjectsRoutingModule,
    StoreModule.forFeature(fromProjects.projectsFeatureKey, fromProjects.reducer),
    EffectsModule.forFeature([ProjectsEffects]),
  ],
  providers: [
    ProjectsService
  ]
})
export class ProjectsModule { }
