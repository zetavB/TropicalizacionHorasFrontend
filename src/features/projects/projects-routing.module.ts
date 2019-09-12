import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsHomeComponent} from './components/projects-home/projects-home.component';

const projectsRoutes: Routes = [
  {path: '', component: ProjectsHomeComponent}
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
