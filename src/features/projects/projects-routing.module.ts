import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsHomeComponent} from './components/projects-home/projects-home.component';
import {ProjectDetailsComponent} from './components/project-details/project-details.component';
import {AddStudentsToProjectComponent} from './components/add-students-to-project/add-students-to-project.component';

const projectsRoutes: Routes = [
  {path: '', component: ProjectsHomeComponent},
  {path: 'detalles/:nombre', component: ProjectDetailsComponent},
  {path: 'agregar-estudiantes/:nombre', component: AddStudentsToProjectComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectsRoutingModule { }
